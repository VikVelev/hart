package domain

import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionSorterWeightFactory
import java.lang.Exception
import java.util.Comparator.comparingLong
import java.util.Comparator.comparingDouble
import java.util.Comparator



class ActionifficultyWeightFactory: SelectionSorterWeightFactory<Solution, Visit> {
    override fun createSorterWeight(solution: Solution, selection: Visit): VisitDifficultyWeight {


        return VisitDifficultyWeight(selection, selection.previous!!)

    }


}

class VisitDifficultyWeight(
    private val visit: Visit,
    val current: Landmark
    ) : Comparable<VisitDifficultyWeight> {



    override fun compareTo(other: VisitDifficultyWeight): Int {
        return COMPARATOR.compare(this, other)
    }

    companion object {

        private val COMPARATOR = Comparator.comparingLong<VisitDifficultyWeight> { it.visit.path?.timeCost ?: 0 }
            .thenComparingLong { it.visit.path?.priceCost ?: 0 } // Ascending (further from the depot are more difficult)
            .thenComparingLong { it.visit.timeCost }
            .thenComparingLong { it.visit.priceCost }
            .reversed()
    }
}
