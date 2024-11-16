package JobFinder.service.impl;

import JobFinder.dto.UserApplyStatsDto;
import JobFinder.repository.ApplyRepository;
import JobFinder.service.StatisticalService;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Data
public class StatisticalServiceImpl implements StatisticalService {
    final ApplyRepository applyRepository;

    @Override
    public List<UserApplyStatsDto> userApplyStats() {
        List<Object[]> jobLists = applyRepository.countUsersForEachJob();
        List<UserApplyStatsDto> userApplyStatsDtos = new ArrayList<>();
        for (Object[] objects : jobLists) {
            UserApplyStatsDto userApplyStatsDto = new UserApplyStatsDto();
            userApplyStatsDto.setJobId(Long.parseLong(objects[0].toString()));
            userApplyStatsDto.setTitle(objects[1].toString());
            userApplyStatsDto.setCountUserApply((objects[2].toString()));
            userApplyStatsDtos.add(userApplyStatsDto);
        }
        return userApplyStatsDtos;
    }
}
