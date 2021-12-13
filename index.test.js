const { fireEvent, getByText } = require('@testing-library/dom');
require('@testing-library/jest-dom/extend-expect');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var fs =require('fs')
const path =require('path')
const fetch = require('cross-fetch')


const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('Renders an input element', () => {
    expect(container.querySelector('input')).not.toBeNull()
  })

  it('Renders a result div element', () => {
    const div = container.querySelector('#results')
    expect(div).not.toBeNull()
  })

  it('Renders a visible div element', () => {
    const div = container.querySelector('#results')
    expect(dom.window.getComputedStyle(div).visibility).toBe('visible')
  })

  it('It should allow characters to be inputted', () => {
    const input = container.querySelector('input')
    expect(input.value).toBe('') // empty before
    fireEvent.change(input, { target: { value: 'abC xqy123Lw409' } })
    expect(input.value).toBe('abC xqy123Lw409') //same entered value after
  })

  
  //API webserver must be up and running
  it("GET http://localhost/backend/api", async()=>{
    try {
        let url="http://localhost/backend/api?q=te"
        const res = await fetch(url)
        const data = await res.json();
        expect(data[0].status).toEqual(true)
        expect(data[0].message).toEqual("Success")
        expect(data[0].total).toBeGreaterThanOrEqual(0)
        expect(data[0].total).toBeLessThanOrEqual(6)
        expect(data[0].data).toEqual(expect.any(Array))
    }
    catch(err){
      console.error(err);
    }
  })
})