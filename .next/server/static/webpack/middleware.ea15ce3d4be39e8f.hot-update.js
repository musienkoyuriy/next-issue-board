"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(middleware)/./node_modules/next/dist/esm/api/headers.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\n\nasync function middleware(request) {\n    if (request.nextUrl.pathname.startsWith('/api')) {\n        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n        const authToken = (await cookieStore).get('auth_token');\n        if (!authToken) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                success: false,\n                error: 'not authorized'\n            }, {\n                status: 401\n            });\n        }\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.next();\n}\nconst config = {\n    matcher: [\n        '/api/:path*'\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXVDO0FBQ3NCO0FBRXRELGVBQWVFLFdBQVdDLE9BQW9CO0lBQ2pELElBQUlBLFFBQVFDLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDQyxVQUFVLENBQUMsU0FBUztRQUM3QyxNQUFNQyxjQUFjUCxxREFBT0E7UUFDM0IsTUFBTVEsWUFBWSxDQUFDLE1BQU1ELFdBQVUsRUFBR0UsR0FBRyxDQUFDO1FBRTFDLElBQUksQ0FBQ0QsV0FBVztZQUNaLE9BQU9QLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3BCO2dCQUFFQyxTQUFTO2dCQUFPQyxPQUFPO1lBQWlCLEdBQzFDO2dCQUFFQyxRQUFRO1lBQUk7UUFFdEI7SUFDSjtJQUVBLE9BQU9aLHFEQUFZQSxDQUFDYSxJQUFJO0FBQzVCO0FBRU8sTUFBTUMsU0FBUztJQUNsQkMsU0FBUztRQUFDO0tBQWM7QUFDNUIsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL211c2llbmtveXVyaXkvbGVhcm4vbmV4dC5qcy1mdW5kYW1lbnRhbHMvbWlkZGxld2FyZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlLCB0eXBlIE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtaWRkbGV3YXJlKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gICAgaWYgKHJlcXVlc3QubmV4dFVybC5wYXRobmFtZS5zdGFydHNXaXRoKCcvYXBpJykpIHtcbiAgICAgICAgY29uc3QgY29va2llU3RvcmUgPSBjb29raWVzKClcbiAgICAgICAgY29uc3QgYXV0aFRva2VuID0gKGF3YWl0IGNvb2tpZVN0b3JlKS5nZXQoJ2F1dGhfdG9rZW4nKTtcblxuICAgICAgICBpZiAoIWF1dGhUb2tlbikge1xuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgICAgICAgIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnbm90IGF1dGhvcml6ZWQnIH0sXG4gICAgICAgICAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5uZXh0KCk7XG59XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gICAgbWF0Y2hlcjogWycvYXBpLzpwYXRoKiddXG59O1xuIl0sIm5hbWVzIjpbImNvb2tpZXMiLCJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsIm5leHRVcmwiLCJwYXRobmFtZSIsInN0YXJ0c1dpdGgiLCJjb29raWVTdG9yZSIsImF1dGhUb2tlbiIsImdldCIsImpzb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJzdGF0dXMiLCJuZXh0IiwiY29uZmlnIiwibWF0Y2hlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});