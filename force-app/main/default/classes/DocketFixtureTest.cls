@isTest
private class DocketFixtureTest {
    @isTest
    static void greetingIsStable() {
        Assert.areEqual('Docket live test', DocketFixture.greeting());
    }
}
