package JobFinder.service;

import JobFinder.dto.UserApplyStatsDto;

import java.util.List;

public interface StatisticalService {
    List<UserApplyStatsDto> userApplyStats();
}
