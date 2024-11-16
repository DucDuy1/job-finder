package JobFinder.dto;

import lombok.Data;

@Data
public class UserApplyStatsDto {
    private Long jobId;
    private String countUserApply;
    private String nameCompany;
    private String title;
}
