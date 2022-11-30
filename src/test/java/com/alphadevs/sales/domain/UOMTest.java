package com.alphadevs.sales.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alphadevs.sales.web.rest.TestUtil;

public class UOMTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UOM.class);
        UOM uOM1 = new UOM();
        uOM1.setId(1L);
        UOM uOM2 = new UOM();
        uOM2.setId(uOM1.getId());
        assertThat(uOM1).isEqualTo(uOM2);
        uOM2.setId(2L);
        assertThat(uOM1).isNotEqualTo(uOM2);
        uOM1.setId(null);
        assertThat(uOM1).isNotEqualTo(uOM2);
    }
}
