@isTest
private class DocketFixtureTest {
    @isTest
    static void greetingIsStable() {
        Assert.areEqual('Docket UI test PR', DocketFixture.greeting());
    }
}
