package com.alphadevs.sales.security;

import com.alphadevs.sales.domain.DocumentType;

/**
 * Constants for Documents
 */
public final class DocumentConstants {

    public static final DocumentType GRN(){
        DocumentType documentType = new DocumentType();
        documentType.setDocumentType("GoodsReceipt");
        documentType.setDocumentTypeCode("GRN");
        return documentType;
    }

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    private DocumentConstants() {
    }

}
