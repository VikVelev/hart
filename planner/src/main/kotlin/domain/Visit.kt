package domain

import org.optaplanner.core.api.domain.entity.PlanningEntity
import org.optaplanner.core.api.domain.variable.InverseRelationShadowVariable
import org.optaplanner.core.api.domain.variable.PlanningVariable
import org.optaplanner.core.api.domain.variable.PlanningVariableGraphType

@PlanningEntity(difficultyWeightFactoryClass = ActionifficultyWeightFactory::class)
class Visit() : Landmark() {
    @PlanningVariable(
        strengthComparatorClass = LandmarkStrengthComparator::class,
        valueRangeProviderRefs = ["startRange", "visitRange"],
        graphType = PlanningVariableGraphType.CHAINED
    )
    var previous: Landmark? = null
        get() = field

    val path: Path?
        get() = previous?.paths?.get(name)

    val timeFromPrevious: Long
        get() = previous?.paths?.get(name)?.timeCost ?: 1

    val priceFromPrevious: Long
        get() = previous?.paths?.get(name)?.priceCost ?: 1

    override fun toString(): String {
        return "$name $timeCost $priceCost"
    }

}
