package domain

import org.optaplanner.core.api.domain.entity.PlanningEntity

data class Path(var name: String,
                override var timeCost: Long = 0,
                override var priceCost: Long = 0) : TravelItem()
