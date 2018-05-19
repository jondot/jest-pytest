const formatFailureMessage = require('./format-failure');

const toTest = test => ({
  ancestorTitles: [],
  duration: test.duration,
  failureMessages: test.call.outcome === 'failed' ? [test.call.longrepr] : [],
  fullName: test.nodeid,
  numPassingAsserts: test.outcome === 'passed' ? 1 : 0,
  status: test.outcome,
  title: test.domain
});

module.exports = ({
  testPath,
  summary,
  tests
}) => {
  const end = +new Date();
  return {
    console: null,
    failureMessage: summary.failed ? formatFailureMessage(tests) : null,
    numFailingTests: summary.failed || 0,
    numPassingTests: summary.passed || 0,
    numPendingTests: 0,
    perfStats: {
      end: end,
      start: end - summary.duration
    },
    skipped: false,
    snapshot: {
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      unmatched: 0,
      updated: 0
    },
    sourceMaps: {},
    testExecError: null,
    testFilePath: testPath,
    testResults: tests.map(toTest)
  };
};