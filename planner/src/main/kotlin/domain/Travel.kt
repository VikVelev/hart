package domain

import org.optaplanner.core.api.domain.entity.PlanningEntity
import org.optaplanner.core.api.domain.variable.PlanningVariable

data class Travel(
    @PlanningVariable(
    nullable = true,
    strengthComparatorClass = PathStrengthComparator::class,
    valueRangeProviderRefs = ["pathRange"])
    var path: Path?= null) : Action()