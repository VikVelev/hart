package domain

import org.optaplanner.core.api.domain.entity.PlanningEntity

//@PlanningEntity(difficultyComparatorClass = LandmarkDifficultyComparator::class)
data class Landmark(var name: String,
                    override var timeCost: Long = 0,
                    override var priceCost: Long = 0,
                    var happiness: Long = 0) : TravelItem()
