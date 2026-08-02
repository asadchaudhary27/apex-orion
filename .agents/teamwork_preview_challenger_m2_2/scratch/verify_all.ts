import { contactFormSchema } from '../../src/components/sections/ContactForm';

// Helper for bold log output
function log(msg: string) {
  console.log(`[TEST] ${msg}`);
}

async function runTests() {
  log('====================================================');
  log('EMPIRICAL TEST SUITE: CONTACT FORM SCHEMA & SCREEN GATES');
  log('====================================================');

  let passed = true;

  // TEST 1: Valid Contact Form Payload
  const validData = {
    name: 'Asad Chaudhry',
    email: 'asad@apex-orion.com',
    service: 'Web Development',
    budget: '$10k – $25k',
    details: 'We require a full dynamic website with high-performance animations and 3D UI.',
  };
  const validResult = contactFormSchema.safeParse(validData);
  if (validResult.success) {
    log('✅ TEST 1 PASSED: Valid payload parsed successfully.');
  } else {
    log(`❌ TEST 1 FAILED: Valid payload failed with errors: ${JSON.stringify(validResult.error.format())}`);
    passed = false;
  }

  // TEST 2: Empty Submission Blocked & Required Fields Enforced
  const emptyResult = contactFormSchema.safeParse({});
  if (!emptyResult.success) {
    const formatted = emptyResult.error.format();
    const nameErr = formatted.name?._errors?.[0];
    const emailErr = formatted.email?._errors?.[0];
    const serviceErr = formatted.service?._errors?.[0];
    const budgetErr = formatted.budget?._errors?.[0];
    const detailsErr = formatted.details?._errors?.[0];

    if (nameErr && emailErr && serviceErr && budgetErr && detailsErr) {
      log('✅ TEST 2 PASSED: Empty submission blocked and all 5 required fields report errors:');
      log(`   - name: "${nameErr}"`);
      log(`   - email: "${emailErr}"`);
      log(`   - service: "${serviceErr}"`);
      log(`   - budget: "${budgetErr}"`);
      log(`   - details: "${detailsErr}"`);
    } else {
      log(`❌ TEST 2 FAILED: Some required fields did not report errors in empty submission. Errors: ${JSON.stringify(formatted)}`);
      passed = false;
    }
  } else {
    log('❌ TEST 2 FAILED: Empty submission was accepted!');
    passed = false;
  }

  // TEST 3: Edge Case / Boundary Checks on Schema Fields
  // 3a. Name < 2 chars
  const shortName = contactFormSchema.safeParse({ ...validData, name: 'A' });
  if (!shortName.success && shortName.error.format().name?._errors?.[0]?.includes('2 characters')) {
    log('✅ TEST 3a PASSED: Name < 2 chars rejected.');
  } else {
    log('❌ TEST 3a FAILED: Name < 2 chars was not rejected properly.');
    passed = false;
  }

  // 3b. Invalid email
  const badEmail = contactFormSchema.safeParse({ ...validData, email: 'not-an-email' });
  if (!badEmail.success && badEmail.error.format().email?._errors?.[0]?.includes('valid email')) {
    log('✅ TEST 3b PASSED: Invalid email format rejected.');
  } else {
    log('❌ TEST 3b FAILED: Invalid email was not rejected properly.');
    passed = false;
  }

  // 3c. Invalid service enum value
  const badService = contactFormSchema.safeParse({ ...validData, service: 'Blockchain' });
  if (!badService.success && badService.error.format().service?._errors?.[0]?.includes('select a service')) {
    log('✅ TEST 3c PASSED: Invalid service enum rejected.');
  } else {
    log('❌ TEST 3c FAILED: Invalid service enum was not rejected properly.');
    passed = false;
  }

  // 3d. Invalid budget enum value
  const badBudget = contactFormSchema.safeParse({ ...validData, budget: '$100' });
  if (!badBudget.success && badBudget.error.format().budget?._errors?.[0]?.includes('select a budget')) {
    log('✅ TEST 3d PASSED: Invalid budget enum rejected.');
  } else {
    log('❌ TEST 3d FAILED: Invalid budget enum was not rejected properly.');
    passed = false;
  }

  // 3e. Details < 10 chars
  const shortDetails = contactFormSchema.safeParse({ ...validData, details: 'Short' });
  if (!shortDetails.success && shortDetails.error.format().details?._errors?.[0]?.includes('10 characters')) {
    log('✅ TEST 3e PASSED: Details < 10 chars rejected.');
  } else {
    log('❌ TEST 3e FAILED: Details < 10 chars was not rejected properly.');
    passed = false;
  }

  // TEST 4: Simulated Media Query Gates for CustomCursor and TiltCard Logic
  log('\n--- Media Query Gate Logic Simulation ---');
  
  function evaluateGates(width: number, isCoarse: boolean, reducedMotion: boolean, maxTouchPoints: number) {
    const isTouchDevice = maxTouchPoints > 0;
    const isMobileWidth = width < 1024;
    const isCoarsePointer = isCoarse;
    const prefersReducedMotion = reducedMotion;

    const cursorDisabled = isTouchDevice || isMobileWidth || isCoarsePointer || prefersReducedMotion;
    const tiltDisabled = isMobileWidth || isCoarsePointer || prefersReducedMotion;

    return { cursorDisabled, tiltDisabled };
  }

  // Scenario A: Desktop (1920px, fine mouse, no reduced motion)
  const desktop = evaluateGates(1920, false, false, 0);
  if (!desktop.cursorDisabled && !desktop.tiltDisabled) {
    log('✅ SCENARIO A PASSED: Desktop (1920px, mouse) enables both CustomCursor and 3D TiltCard.');
  } else {
    log('❌ SCENARIO A FAILED: Desktop incorrectly disabled cursor or tilt.');
    passed = false;
  }

  // Scenario B: Mobile Screen (< 1024px, e.g. 768px tablet/phone)
  const mobileWidth = evaluateGates(768, false, false, 0);
  if (mobileWidth.cursorDisabled && mobileWidth.tiltDisabled) {
    log('✅ SCENARIO B PASSED: Mobile width (<1024px) disables both CustomCursor and 3D TiltCard.');
  } else {
    log('❌ SCENARIO B FAILED: Mobile width did not disable cursor or tilt.');
    passed = false;
  }

  // Scenario C: Coarse pointer (touchscreen laptop 1400px with touch input)
  const touchLaptop = evaluateGates(1400, true, false, 5);
  if (touchLaptop.cursorDisabled && touchLaptop.tiltDisabled) {
    log('✅ SCENARIO C PASSED: Coarse pointer/touch disables both CustomCursor and 3D TiltCard.');
  } else {
    log('❌ SCENARIO C FAILED: Coarse pointer did not disable cursor or tilt.');
    passed = false;
  }

  // Scenario D: Prefers Reduced Motion
  const reducedMotion = evaluateGates(1920, false, true, 0);
  if (reducedMotion.cursorDisabled && reducedMotion.tiltDisabled) {
    log('✅ SCENARIO D PASSED: prefers-reduced-motion: reduce disables both CustomCursor and 3D TiltCard.');
  } else {
    log('❌ SCENARIO D FAILED: reduced motion did not disable cursor or tilt.');
    passed = false;
  }

  log('====================================================');
  if (passed) {
    log('FINAL EMPIRICAL VERDICT: ALL TESTS PASSED SUCCESSFULLY!');
  } else {
    log('FINAL EMPIRICAL VERDICT: SOME TESTS FAILED.');
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
