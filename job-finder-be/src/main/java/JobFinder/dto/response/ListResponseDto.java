package JobFinder.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ListResponseDto<T>  {
    private int pageSize;
    private int pageTotal;
    private List<T> listItems;

    public ListResponseDto(Page<T> page ) {
        this.pageTotal = page.getTotalPages();
        this.listItems = page.getContent();
        this.pageSize = page.getSize();
    }
}
