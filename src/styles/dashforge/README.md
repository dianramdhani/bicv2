# Dashforge
## Getting started
### Step 1: Install some libraries:
```shell
npm i -S feather-icons
npm i -D @types/feather-icons
```
### Step 2: Update `angular.json`:
```javascript
"styles": [
	"src/styles/dashforge/lib/@fortawesome/fontawesome-free/css/all.min.css",
	"src/styles/dashforge/lib/ionicons/css/ionicons.min.css",
	"src/styles/dashforge/assets/css/dashforge.css",
	"src/styles/dashforge/assets/css/dashforge.dashboard.css",
	...
],
"scripts": [
	...
	"src/styles/dashforge/lib/jquery/jquery.min.js",
	"src/styles/dashforge/lib/bootstrap/js/bootstrap.bundle.min.js",
	"src/styles/dashforge/lib/feather-icons/feather.min.js",
	"src/styles/dashforge/lib/perfect-scrollbar/perfect-scrollbar.min.js",
	"src/styles/dashforge/lib/jquery.flot/jquery.flot.js",
	"src/styles/dashforge/lib/jquery.flot/jquery.flot.stack.js",
	"src/styles/dashforge/lib/jquery.flot/jquery.flot.resize.js",
	{
		"input": "src/styles/dashforge/assets/js/dashforge.js",
		"lazy": true,
		"bundleName": "dashforge"
	},
	{
		"input": "src/styles/dashforge/assets/js/dashforge.aside.js",
		"lazy": true,
		"bundleName": "dashforge.aside"
	}
]
```
### Step 3: Add code on wrapper component:
```typescript
import { replace } from 'feather-icons';
...
scriptElements = [
	document.createElement('script'),
	document.createElement('script')
];

ngAfterViewInit() {
	this.scriptElements[0].src = './dashforge.js';
	this.scriptElements[1].src = './dashforge.aside.js';
	this.scriptElements.forEach(scriptElement => {
		document.body.appendChild(scriptElement);
	});
	replace();
}

ngOnDestroy() {
	this.scriptElements.forEach(scriptElement => {
		scriptElement.parentElement.removeChild(scriptElement);
	});
}
```