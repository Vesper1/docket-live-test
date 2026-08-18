@isTest
private class DocketDeployProbeTest {
    @isTest
    static void describesTheChange() {
        Assert.areEqual('Docket deployed ApexClass in M8', DocketDeployProbe.describe('ApexClass'));
    }

    @isTest
    static void handlesAnEmptyChange() {
        Assert.areEqual('Docket deployed nothing named', DocketDeployProbe.describe('   '));
    }
}
