/**
 * The first class Docket deploys to a real org through the whole pipeline.
 *
 * It exists to be deployed and rolled back, so it holds no behaviour anything
 * else depends on: whatever a run does to it, nothing in the org breaks.
 */
public with sharing class DocketDeployProbe {
    public static final String RELEASE = 'M8';

    public static String describe(String change) {
        if (String.isBlank(change)) {
            return 'Docket deployed nothing named';
        }

        return 'Docket deployed ' + change + ' in ' + RELEASE;
    }
}
