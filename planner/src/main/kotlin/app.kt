import domain.*
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.http.ContentType
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.optaplanner.core.api.solver.SolverFactory
import org.mvel2.util.Make.String
import org.optaplanner.core.config.constructionheuristic.ConstructionHeuristicPhaseConfig
import org.optaplanner.core.config.constructionheuristic.placer.QueuedEntityPlacerConfig
import org.optaplanner.core.config.domain.ScanAnnotatedClassesConfig
import org.optaplanner.core.config.heuristic.selector.entity.EntitySelectorConfig
import org.optaplanner.core.config.score.director.ScoreDirectorFactoryConfig
import org.optaplanner.core.config.solver.termination.TerminationConfig
import org.optaplanner.core.impl.constructionheuristic.ConstructionHeuristicPhase
import org.optaplanner.core.impl.heuristic.selector.move.composite.UnionMoveSelector
import org.optaplanner.core.impl.heuristic.selector.move.generic.ChangeMoveSelector
import org.optaplanner.core.impl.heuristic.selector.move.generic.SwapMoveSelector
import kotlin.system.exitProcess


fun Application.module() {
    install(DefaultHeaders)
    install(CallLogging)
    install(Routing) {
        get("/") {
            call.respondText("My Example Blog2", ContentType.Text.Html)
        }
    }
}

fun main() {
    var factory = SolverFactory.createFromXmlResource<Solution>("config.xml")
    factory.solverConfig.solutionClass = Solution::class.java
    factory.solverConfig.entityClassList = listOf(Visit::class.java, Travel::class.java)
//    factory.solverConfig.scanAnnotatedClassesConfig = ScanAnnotatedClassesConfig()
//    factory.solverConfig.scanAnnotatedClassesConfig.packageIncludeList = listOf("domain")
    factory.solverConfig.scoreDirectorFactoryConfig = ScoreDirectorFactoryConfig()
    factory.solverConfig.scoreDirectorFactoryConfig.easyScoreCalculatorClass = SolutionEasyScoreCalculator::class.java
    factory.solverConfig.terminationConfig = TerminationConfig()
    factory.solverConfig.terminationConfig.secondsSpentLimit = 5


    var solver = factory.buildSolver()

    var unsolved = Solution()

    var landmarkList = mutableListOf<Landmark>()
    landmarkList.add(Landmark("A", 10, 5, 8))
    landmarkList.add(Landmark("B", 5, 5, 12))
    landmarkList.add(Landmark("C", 8, 5, 9))
    landmarkList.add(Landmark("D", 3, 10, 4))

    var pathList = mutableListOf<Path>()
    pathList.add(Path("P_A", 2, 1))
    pathList.add(Path("P_B", 4, 1))
    pathList.add(Path("P_C", 3, 1))

    unsolved.landmarkList = landmarkList;
    unsolved.pathList = pathList;

//    unsolved.visitList.add(Visit(path = pathList[0], landmark = landmarkList[0]))
//    unsolved.visitList.add(Visit(path = pathList[0], landmark = landmarkList[1]))
//    unsolved.visitList.add(Visit(path = pathList[1], landmark = landmarkList[1]))
//    unsolved.visitList.add(Visit(path = pathList[1], landmark = landmarkList[2]))

    unsolved.maxTime = 25;

    var result = solver.solve(unsolved)
    result.visitList.forEach {
        println(it)
    }
    exitProcess(0)
    embeddedServer(Netty, 8080, watchPaths = listOf("AppKt"), module = Application::module).start(wait = true)
}