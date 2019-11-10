package domain

import org.optaplanner.core.impl.heuristic.selector.common.decorator.SelectionSorterWeightFactory
import java.util.*
import java.util.Collections.reverseOrder
import java.util.Comparator.comparing
import java.util.Comparator.comparingLong
import java.util.Comparator




class LandmarkStrengthComparator : Comparator<Landmark> {
    override fun compare(a: Landmark?, b: Landmark?): Int {
        if(a == null) {
            return -1;
        }

        if(b == null) {
            return 1;
        }

        return COMPARATOR.compare(a, b)
    }

    companion object {
        private val COMPARATOR = Comparator.comparingLong(Landmark::happiness)
            .thenComparing(reverseOrder(comparingLong(Landmark::priceCost)))
            .thenComparing(reverseOrder(comparingLong(Landmark::timeCost)))
    }

}