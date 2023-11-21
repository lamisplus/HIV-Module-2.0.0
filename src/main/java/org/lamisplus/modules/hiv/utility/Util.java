package org.lamisplus.modules.hiv.utility;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class Util {
    public static String encodeParameter(String encodedParameter) {
        try {
            return URLEncoder.encode(encodedParameter, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Error decoding parameter", e);
        }
    }

    public static String decodeParameter(String decodedParameter) {
        try {
            return URLDecoder.decode(decodedParameter, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Error decoding parameter", e);
        }
    }


}
