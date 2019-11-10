package domain

import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore
import org.optaplanner.core.impl.score.director.easy.EasyScoreCalculator


class SolutionEasyScoreCalculator : EasyScoreCalculator<Solution> {

    /**
     * A very simple implementation. The double loop can easily be removed by using Maps as shown in
     * [CloudBalancingMapBasedEasyScoreCalculator.calculateScore].
     */
    override fun calculateScore(solution: Solution): HardMediumSoftLongScore {
        var hardScore = solution.maxTime
        var softScore = 0L
        var medium: Long = 0
        var set = mutableSetOf<String>()
        var previous = solution.start

        for (action in solution.visitList) {
            if(!set.contains(action.name)) {
                hardScore -= action.timeCost
                softScore -= action.priceCost
                softScore += action.happiness
                set.add(action.name)

            }

            if(action.path != null) {
                hardScore -= action.path!!.timeCost
                softScore -= action.path!!.priceCost
                set.add(action.path!!.name)
            }else{
                medium -= 10;
            }
        }

        if(hardScore > 0) {
            medium += (hardScore - solution.maxTime)
            hardScore = 0
        }
        return HardMediumSoftLongScore.of(hardScore, medium, softScore)
    }

}
