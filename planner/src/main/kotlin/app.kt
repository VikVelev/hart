import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Klaxon
import com.beust.klaxon.Parser
import domain.*
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.client.features.json.JsonFeature
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.http.ContentType
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.util.AttributeKey
import org.optaplanner.core.api.solver.SolverFactory
import org.optaplanner.core.api.solver.Solver
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
import java.io.File
import java.lang.Integer.max
import java.nio.charset.Charset
import javax.print.attribute.standard.Destination
import kotlin.random.Random
import kotlin.system.exitProcess


fun recLen(visit: Visit) : Int {
    return if(visit.previous is Visit) {
        recLen(visit.previous as Visit) + 1
    }else {
        1
    }
}

fun recPath(visit: Visit) : List<Visit> {
    return if(visit.previous is Visit) {
        recPath(visit.previous as Visit) + visit
    }else {
        listOf(visit)
    }
}

fun bestPath(solution: Solution): Visit {
    var best: Visit? = null
    var count = 0;
    for (visit in solution.visitList) {
        var nc = recLen(visit)
        if(count != max(count, nc)){
            best = visit
            count = nc
        }else{

        }
    }
    return best!!;
}

fun Application.module() {
    install(DefaultHeaders)
    install(CallLogging)
    install(Routing) {
        get("/") {
            var places = call.request.queryParameters.getAll("item")!!.toSet()


            var unsolved = Solution()
            unsolved.start = landmarks[0]

            unsolved.landmarkList = landmarks.map { it as Landmark }.toMutableList()

            unsolved.visitList = landmarks.filter { places.contains<String>(it.name) }.toMutableList()
            var start = unsolved.start
            unsolved.visitList.forEach {
                it.previous = start
                start = it
            }
            unsolved.maxTime = 5 * 60 * 60;


            solver!!.solve(unsolved)


            var path = recPath(bestPath(solver!!.bestSolution))
            call.respondText(Klaxon().toJsonString(path), ContentType.Application.Json)
        }
    }
}

var landmarks: MutableList<Visit> = mutableListOf()
var solver: Solver<Solution>? = null
fun main() {

    var json: JsonArray<JsonArray<JsonObject>> = Parser.default().parse(File("../graph_builder/data/matrix_advanced.json").reader(Charset.defaultCharset())) as JsonArray<JsonArray<JsonObject>>

    for(row in json) {
        var lm = Visit()
        lm.happiness = Random.nextLong(10, 100)
        lm.priceCost = Random.nextLong(100, 1000)
        lm.timeCost = 60 * 60;

        for(item in row) {
            try {
                lm.name = item.string("origin")!!
                var destination = item.string("destination")!!
                if(lm.name == destination) continue
                lm.paths.put(
                    destination,
                    Path(destination, item.obj("distance")?.long("value") ?: 1L, item.obj("duration")?.long("value") ?: 60L, item.int("hashKey") ?: 0)
                )
            }catch (e: Exception) {
                println(item)
            }
        }

        landmarks.add(lm)
    }

    var factory = SolverFactory.createFromXmlResource<Solution>("config.xml")


    factory.solverConfig.solutionClass = Solution::class.java
    factory.solverConfig.entityClassList = listOf(Visit::class.java)
//    factory.solverConfig.scanAnnotatedClassesConfig = ScanAnnotatedClassesConfig()
//    factory.solverConfig.scanAnnotatedClassesConfig.packageIncludeList = listOf("domain")
    factory.solverConfig.scoreDirectorFactoryConfig = ScoreDirectorFactoryConfig()
    factory.solverConfig.scoreDirectorFactoryConfig.easyScoreCalculatorClass = SolutionEasyScoreCalculator::class.java
    factory.solverConfig.terminationConfig = TerminationConfig()
    factory.solverConfig.terminationConfig.secondsSpentLimit = 5


    solver = factory.buildSolver()


    solver!!.addEventListener {



//        var cur = best!!
//        while (cur.previous is Visit) {
//            print(cur)
//            print(" | ")
//            cur = cur.previous as Visit
//        }
//        print(it.newBestSolution.start)
//
//        println()
    }
/*
    var unsolved = Solution()
    unsolved.start = landmarks[0]

    unsolved.landmarkList = landmarks.map { it as Landmark }.toMutableList()

    unsolved.visitList = landmarks.takeLast(5).toMutableList()

    var start = unsolved.start
    unsolved.visitList.forEach {
        it.previous = start
        start = it
    }
    unsolved.maxTime = 5 * 60 * 60;

 */


//    solver!!.solve(unsolved)

//    var result = solver.bestSolution
//    result.visitList.forEach {
//        println(it)
//    }
//    exitProcess(0)
    embeddedServer(Netty, 8080, watchPaths = listOf("AppKt"), module = Application::module).start(wait = true)
}