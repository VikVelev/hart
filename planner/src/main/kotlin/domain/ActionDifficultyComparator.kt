package domain

class ActionDifficultyComparator : Comparator<Action> {
    override fun compare(a: Action, b: Action): Int {
        if( a is Travel && b is Travel ) {
            return COMPARATOR_T.compare(a, b)
        }else if(a is Visit && b is Visit) {
            return COMPARATOR_V.compare(a, b)
        }
        return 0;
    }

    companion object {
        private val COMPARATOR_V = java.util.Comparator.comparingLong<Visit> { (it.landmark?.timeCost ?: 0) }
            .thenComparingLong { (it.landmark?.priceCost ?: 0) }
            .thenComparingLong { (it.landmark?.happiness ?: 0) }

        private val COMPARATOR_T = java.util.Comparator.comparingLong<Travel> { (it.path?.timeCost ?: 0) }
            .thenComparingLong { (it.path?.priceCost ?: 0) }
    }

}
