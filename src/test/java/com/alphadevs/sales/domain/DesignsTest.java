package com.alphadevs.sales.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alphadevs.sales.web.rest.TestUtil;

public class DesignsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Designs.class);
        Designs designs1 = new Designs();
        designs1.setId(1L);
        Designs designs2 = new Designs();
        designs2.setId(designs1.getId());
        assertThat(designs1).isEqualTo(designs2);
        designs2.setId(2L);
        assertThat(designs1).isNotEqualTo(designs2);
        designs1.setId(null);
        assertThat(designs1).isNotEqualTo(designs2);
    }
}
