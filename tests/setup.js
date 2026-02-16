const { TextEncoder, TextDecoder } = require('util');
require('whatwg-fetch');
require('@testing-library/jest-dom');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
