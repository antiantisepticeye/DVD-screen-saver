//#region canvas setup

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;
//#endregion




class DVDLogo {
	constructor() {
		this.width = 250;
		this.height = 109;
		this.pos = {
			x: Math.random() * (canvas.width - this.width),
			y: Math.random() * (canvas.height - this.height)
		}
		this.currentColor = this.HSLToHex(Math.floor(Math.random() * 360), 50, 50);

		this.vel = {
			x: 1,
			y: 1
		}
	}

	newColor() {
		this.currentColor = this.HSLToHex(Math.floor(Math.random() * 360), 50, 50);
	}

	update(){
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		
		if(this.pos.y <= 0 || (this.pos.y + this.height) >= canvas.height) {
			this.vel.y *= -1;
			this.newColor()
		}
		if(this.pos.x <= 0 || (this.pos.x + this.width) >= canvas.width) {
			this.vel.x *= -1;
			this.newColor()
		}

		
		this.draw()
	}
    HSLToHex(h,s,l) {
        s /= 100;
        l /= 100;
      
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0, 
            b = 0; 
      
        if (0 <= h && h < 60) {
          r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
          r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
          r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
          r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
          r = x; g = 0; b = c;
        } else if (300 <= h && h <= 360) {
          r = c; g = 0; b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);
      
        // Prepend 0s, if necessary
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        return "#" + r + g + b;
      }

	randomColorLogo() {
		const re = new RegExp('#FFFFFF', 'gi')
		const svg =`
		<svg width="${this.width}" height="${this.height}" viewBox="0 0 500 219" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M319.43 0.0209351H442.366C474.116 0.0209351 509.99 26.3867 497.419 65.2048C482.222 112.144 417.714 124.307 376.174 124.307H324.495L344.423 37.8452H391.036L377.531 97.9636C424.144 97.9636 446.43 81.0687 450.487 60.8068C454.996 38.2531 434.95 28.3892 413.33 28.3892H343.756L234.325 153.358L191.769 31.7637L191.576 31.7711C194.439 41.2865 194.847 52.5819 190.76 65.2048C175.557 112.144 119.829 124.307 78.2889 124.307H15.1298L35.058 37.8452H81.6634L68.1579 97.9636C114.763 97.9636 140.432 85.8005 145.839 60.8068C150.696 38.3273 125.577 28.3892 103.957 28.3892H37.0827L43.8391 0.0209351H226.211L253.23 76.3444L319.43 0.0209351Z" fill="#FFFFFF"/>
		<path d="M360.132 197.523C369.95 197.523 377.909 192.489 377.909 186.28C377.909 180.07 369.95 175.036 360.132 175.036C350.314 175.036 342.354 180.07 342.354 186.28C342.354 192.489 350.314 197.523 360.132 197.523Z" fill="#FFFFFF"/>
		<path d="M226.211 197.026C235.445 197.026 242.928 192.725 242.928 186.784C242.928 180.851 235.445 176.201 226.211 176.201H222.162V197.085L226.211 197.026Z" fill="#FFFFFF"/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M235 218.979C364.787 218.979 470 205.02 470 187.8C470 170.58 364.787 156.621 235 156.621C105.213 156.621 0 170.58 0 187.8C0 205.02 105.213 218.979 235 218.979ZM387.358 186.28C387.358 196.962 375.168 205.622 360.132 205.622C345.095 205.622 332.906 196.962 332.906 186.28C332.906 175.597 345.095 166.937 360.132 166.937C375.168 166.937 387.358 175.597 387.358 186.28ZM253.675 186.784C253.675 176.631 241.378 168.057 226.212 168.057L211.69 168.035V205.169H226.212C241.378 205.169 253.675 196.937 253.675 186.784ZM95.1763 168.042H107.673L121.349 191.011L135.025 168.042H147.522L125.399 205.199H117.292L95.1763 168.042ZM169.809 168.042H180.452V205.199H169.809V168.042ZM278.654 168.042H309.469V176.149H289.289L289.274 182.156H309.462V189.78H289.274L289.289 197.093H309.469V205.199H278.654V168.042Z" fill="#FFFFFF"/>
		</svg>		
		`.replace(re , this.currentColor)
		const url = 'data:image/svg+xml;base64,' + btoa(svg);
		return url
	}

	draw() {
		if(this.pos.y < -1 || (this.pos.y + this.height) >= canvas.height+1) {
			this.pos = {
				x: Math.random() * (canvas.width - this.width),
				y: Math.random() * (canvas.height - this.height)
			}
			this.newColor()
		}
		if(this.pos.x < -1 || (this.pos.x + this.width) >= canvas.width+1) {
			this.pos = {
				x: Math.random() * (canvas.width - this.width),
				y: Math.random() * (canvas.height - this.height)
			}
			this.newColor()
		}



		const img = new Image();
		img.src = this.randomColorLogo();
		img.onload = () => {
			ctx.clearRect(0,0,canvas.width, canvas.height)
			ctx.drawImage(img, this.pos.x,  this.pos.y)
		}
	}
}


const DVD = new DVDLogo();


function draw() {
	requestAnimationFrame(draw);
	DVD.update();
}

function init() {
	const iconElm = document.createElement('link');
	iconElm.rel = "icon";
	iconElm.href = DVD.randomColorLogo();

	const EmbedIcon = document.createElement('meta');
	EmbedIcon.property = "og:image";
	EmbedIcon.content = DVD.randomColorLogo();
	console.log(DVD.randomColorLogo())
	DVD.newColor();
	document.head.appendChild(iconElm);
	draw()
}
window.onresize = () => {
	canvas.height = innerHeight;
	canvas.width = innerWidth;
}


init();

