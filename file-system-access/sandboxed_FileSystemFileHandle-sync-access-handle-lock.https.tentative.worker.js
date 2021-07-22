importScripts("/resources/testharness.js");

'use strict';

promise_test(async t => {
  const dir = await navigator.storage.getDirectory();
  const fileHandle = await dir.getFileHandle('OPFS.test', {create: true});

  const syncHandle1 = await fileHandle.createSyncAccessHandle();
  await promise_rejects_dom(t, 'InvalidStateError', fileHandle.createSyncAccessHandle());

  await syncHandle1.close();
  const syncHandle2 = await fileHandle.createSyncAccessHandle();
  await syncHandle2.close();
}, 'There can only be one open access handle at any given time');

done();
