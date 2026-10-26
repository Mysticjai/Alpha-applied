const fs = require('fs');

const tos = fs.readFileSync('C:\\Users\\jaiav\\OneDrive\\Desktop\\alpha-applied-analytics-v2\\alpha-applied-analytics-v2\\src\\pages\\TermsOfServicePage.tsx', 'utf8');
const pp = fs.readFileSync('C:\\Users\\jaiav\\OneDrive\\Desktop\\alpha-applied-analytics-v2\\alpha-applied-analytics-v2\\src\\pages\\PrivacyPolicyPage.tsx', 'utf8');

console.log('TOS hrefs:', Array.from(tos.matchAll(/href=["']([^"']+)["']/g)).map(m => m[1]));
console.log('PP hrefs: ', Array.from(pp.matchAll(/href=["']([^"']+)["']/g)).map(m => m[1]));
