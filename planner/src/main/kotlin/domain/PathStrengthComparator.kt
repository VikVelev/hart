package domain

import java.util.*
import java.util.Collections.reverseOrder
import java.util.Comparator.comparing
import java.util.Comparator.comparingLong
import java.util.Comparator

class PathStrengthComparator : Comparator<Path> {
    override fun compare(a: Path?, b: Path?): Int {

        if(a == null) {
            return -1;
        }

        if(b == null) {
            return 1;
        }

        return COMPARATOR.compare(a, b)
    }

    companion object {
        private val COMPARATOR = Comparator.comparingLong(Path::priceCost)
            .thenComparingLong(Path::timeCost).reversed()
    }

}