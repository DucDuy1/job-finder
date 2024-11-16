package JobFinder.controller;

import JobFinder.dto.UserApplyStatsDto;
import JobFinder.service.JobService;
import JobFinder.service.StatisticalService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@Data
public class StatisticsController {
    final StatisticalService statisticalService;

    @GetMapping("/user")
    public ResponseEntity<List<UserApplyStatsDto>> getUserApplyStats() {
        List<UserApplyStatsDto> userApplyStatsDtos = statisticalService.userApplyStats();
        return ResponseEntity.ok(userApplyStatsDtos);
    }
}
