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
        var set = mutableSetOf<String>()
        for (action in solution.visitList) {
            if(action is Visit && set.contains(action.landmark?.name ?: "")) {
                hardScore -= action.landmark?.timeCost ?: 0
                softScore -= action.landmark?.priceCost ?: 0
                softScore += action.landmark?.happiness ?: 0
                set.add(action.landmark?.name ?: "")

            }

            if(action is Travel && set.contains(action.path?.name ?: "")) {
                hardScore -= action.path?.timeCost ?: 0
                softScore -= action.path?.priceCost ?: 0
                set.add(action.path?.name ?: "")

            }



        }

        if(hardScore > 0) {
            hardScore = 0
        }
        return HardMediumSoftLongScore.of(hardScore,0, softScore)
    }

}
