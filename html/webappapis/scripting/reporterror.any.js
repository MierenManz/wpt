setup({ allow_uncaught_exception:true });

[
  1,
  new TypeError(),
  undefined
].forEach(throwable => {
  test(t => {
    let happened = false;
    self.addEventListener("error", t.step_func(e => {
      assert_true(e.message !== "");
      assert_equals(e.filename, new URL("reporterror.any.js", location.href).href);
      assert_greater_than(e.lineno, 0);
      assert_greater_than(e.colno, 0);
      assert_equals(e.error, throwable);
      happened = true;
    }));
    self.reportError(throwable);
    assert_true(happened);
  }, `self.reportError(${throwable})`);
});
