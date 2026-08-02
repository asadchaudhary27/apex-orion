import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  service: z.enum(['Web Development', 'Mobile App', 'Custom POS', 'UI/UX & Brand', 'Other'], {
    errorMap: () => ({ message: 'Please select a service needed' }),
  }),
  budget: z.enum(['$1k – $5k', '$5k – $10k', '$10k – $25k', '$25k+'], {
    errorMap: () => ({ message: 'Please select a budget range' }),
  }),
  details: z.string().min(10, { message: 'Project details must be at least 10 characters' }),
});

console.log("--- TEST 1: Empty Submission ---");
const emptyResult = contactFormSchema.safeParse({
  name: '',
  email: '',
  service: '',
  budget: '',
  details: '',
});
console.log("Empty submission success:", emptyResult.success);
if (!emptyResult.success) {
  console.log("Errors captured:", emptyResult.error.format());
}

console.log("\n--- TEST 2: Invalid Inputs (short name, invalid email, short details) ---");
const invalidResult = contactFormSchema.safeParse({
  name: 'A',
  email: 'not-an-email',
  service: 'Invalid Service',
  budget: 'Invalid Budget',
  details: 'Too short',
});
console.log("Invalid submission success:", invalidResult.success);
if (!invalidResult.success) {
  console.log("Errors captured:", invalidResult.error.flatten().fieldErrors);
}

console.log("\n--- TEST 3: Valid Inputs ---");
const validResult = contactFormSchema.safeParse({
  name: 'Alpha & Asad',
  email: 'alpha@apexorion.com',
  service: 'Web Development',
  budget: '$5k – $10k',
  details: 'We need a high performance web application built with React and Tailwind CSS.',
});
console.log("Valid submission success:", validResult.success);
if (validResult.success) {
  console.log("Parsed data:", validResult.data);
}
