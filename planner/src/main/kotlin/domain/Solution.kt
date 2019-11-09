package domain

import org.optaplanner.core.api.domain.entity.PlanningEntity
import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty
import org.optaplanner.core.api.domain.solution.PlanningScore
import org.optaplanner.core.api.domain.solution.PlanningSolution
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider
import org.optaplanner.core.api.domain.variable.PlanningVariable
import org.optaplanner.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore
import org.optaplanner.core.api.score.buildin.hardmediumsoftlong.HardMediumSoftLongScore
import java.io.Serializable
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore
import org.optaplanner.core.impl.score.director.easy.EasyScoreCalculator






@PlanningSolution
class Solution {
    var maxTime: Long = 0;

    var name: String = "";


    var pathList: MutableList<Path> = mutableListOf()
        @ValueRangeProvider(id = "pathRange")
        @ProblemFactCollectionProperty get

    var landmarkList: MutableList<Landmark> = mutableListOf()
        @ValueRangeProvider(id = "landmarkRange")
        @ProblemFactCollectionProperty get

    var score: HardMediumSoftLongScore = HardMediumSoftLongScore.ZERO
        @PlanningScore get

    var visitList: MutableList<Action> = mutableListOf()
        @ValueRangeProvider(id = "visitRange")
        @PlanningEntityCollectionProperty get



}