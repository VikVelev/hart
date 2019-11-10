package domain

import org.optaplanner.core.api.domain.entity.PlanningEntity
import org.optaplanner.core.api.domain.variable.InverseRelationShadowVariable

//@PlanningEntity(difficultyComparatorClass = LandmarkDifficultyComparator::class)
open class Landmark {
    var name: String = ""
    var timeCost: Long = 0
    var priceCost: Long = 0
    var paths: MutableMap<String, Path> = mutableMapOf()
    var happiness: Long = 0



}
