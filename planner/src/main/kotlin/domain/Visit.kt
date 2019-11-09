package domain

import org.optaplanner.core.api.domain.entity.PlanningEntity
import org.optaplanner.core.api.domain.variable.PlanningVariable

@PlanningEntity(difficultyComparatorClass = ActionDifficultyComparator::class)
data class Visit(
   @PlanningVariable(
        nullable = true,
        strengthComparatorClass = LandmarkStrengthComparator::class,
        valueRangeProviderRefs = ["landmarkRange"])
    var landmark: Landmark? = null
) : Action()
