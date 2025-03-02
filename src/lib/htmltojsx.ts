/**
 * Modern HTML to JSX Converter
 * A TypeScript rewrite of the original HTMLtoJSX
 * Compatible with React 19+ and modern TypeScript
 */

// Node type constants
enum NodeType {
    ELEMENT = 1,
    TEXT = 3,
    COMMENT = 8
}

// Interface for configuration options
interface HTMLtoJSXConfig {
    indent?: string;
}

// Interface for element attribute mapping
interface ElementAttributeMapping {
    [key: string]: {
        [key: string]: string;
    };
}

// Common HTML attribute to React prop mappings
const ATTRIBUTE_MAPPING: Record<string, string> = {
    for: "htmlFor",
    class: "className",
    acceptcharset: "acceptCharset",
    accesskey: "accessKey",
    autocomplete: "autoComplete",
    autofocus: "autoFocus",
    autoplay: "autoPlay",
    colspan: "colSpan",
    contenteditable: "contentEditable",
    crossorigin: "crossOrigin",
    datetime: "dateTime",
    enctype: "encType",
    formaction: "formAction",
    formenctype: "formEncType",
    formmethod: "formMethod",
    formnovalidate: "formNoValidate",
    formtarget: "formTarget",
    frameborder: "frameBorder",
    hreflang: "hrefLang",
    "http-equiv": "httpEquiv",
    inputmode: "inputMode",
    keyparams: "keyParams",
    keytype: "keyType",
    marginheight: "marginHeight",
    marginwidth: "marginWidth",
    maxlength: "maxLength",
    mediagroup: "mediaGroup",
    minlength: "minLength",
    novalidate: "noValidate",
    radiogroup: "radioGroup",
    readonly: "readOnly",
    rowspan: "rowSpan",
    spellcheck: "spellCheck",
    srcdoc: "srcDoc",
    srclang: "srcLang",
    srcset: "srcSet",
    tabindex: "tabIndex",
    usemap: "useMap"
};

// Element-specific attribute mappings
const ELEMENT_ATTRIBUTE_MAPPING: ElementAttributeMapping = {
    input: {
        checked: "defaultChecked",
        value: "defaultValue",
        autofocus: "autoFocus"
    }
};

// SVG tag name mappings
const ELEMENT_TAG_NAME_MAPPING: Record<string, string> = {
    a: "a",
    altglyph: "altGlyph",
    altglyphdef: "altGlyphDef",
    altglyphitem: "altGlyphItem",
    animate: "animate",
    animatecolor: "animateColor",
    animatemotion: "animateMotion",
    animatetransform: "animateTransform",
    audio: "audio",
    canvas: "canvas",
    circle: "circle",
    clippath: "clipPath",
    "color-profile": "colorProfile",
    cursor: "cursor",
    defs: "defs",
    desc: "desc",
    discard: "discard",
    ellipse: "ellipse",
    feblend: "feBlend",
    fecolormatrix: "feColorMatrix",
    fecomponenttransfer: "feComponentTransfer",
    fecomposite: "feComposite",
    feconvolvematrix: "feConvolveMatrix",
    fediffuselighting: "feDiffuseLighting",
    fedisplacementmap: "feDisplacementMap",
    fedistantlight: "feDistantLight",
    fedropshadow: "feDropShadow",
    feflood: "feFlood",
    fefunca: "feFuncA",
    fefuncb: "feFuncB",
    fefuncg: "feFuncG",
    fefuncr: "feFuncR",
    fegaussianblur: "feGaussianBlur",
    feimage: "feImage",
    femerge: "feMerge",
    femergenode: "feMergeNode",
    femorphology: "feMorphology",
    feoffset: "feOffset",
    fepointlight: "fePointLight",
    fespecularlighting: "feSpecularLighting",
    fespotlight: "feSpotLight",
    fetile: "feTile",
    feturbulence: "feTurbulence",
    filter: "filter",
    font: "font",
    "font-face": "fontFace",
    "font-face-format": "fontFaceFormat",
    "font-face-name": "fontFaceName",
    "font-face-src": "fontFaceSrc",
    "font-face-uri": "fontFaceUri",
    foreignobject: "foreignObject",
    g: "g",
    glyph: "glyph",
    glyphref: "glyphRef",
    hatch: "hatch",
    hatchpath: "hatchpath",
    hkern: "hkern",
    iframe: "iframe",
    image: "image",
    line: "line",
    lineargradient: "linearGradient",
    marker: "marker",
    mask: "mask",
    mesh: "mesh",
    meshgradient: "meshgradient",
    meshpatch: "meshpatch",
    meshrow: "meshrow",
    metadata: "metadata",
    "missing-glyph": "missingGlyph",
    mpath: "mpath",
    path: "path",
    pattern: "pattern",
    polygon: "polygon",
    polyline: "polyline",
    radialgradient: "radialGradient",
    rect: "rect",
    script: "script",
    set: "set",
    solidcolor: "solidcolor",
    stop: "stop",
    style: "style",
    svg: "svg",
    switch: "switch",
    symbol: "symbol",
    text: "text",
    textpath: "textPath",
    title: "title",
    tref: "tref",
    tspan: "tspan",
    unknown: "unknown",
    use: "use",
    video: "video",
    view: "view",
    vkern: "vkern"
};

/**
 * Convert tag name to tag name suitable for JSX
 */
function jsxTagName(tagName: string): string {
    const name = tagName.toLowerCase();
    return ELEMENT_TAG_NAME_MAPPING[name] || name;
}

/**
 * Repeats a string a certain number of times
 */
function repeatString(string: string, times: number): string {
    if (times === 1) {
        return string;
    }
    if (times < 0) {
        throw new Error("Times parameter must be non-negative");
    }
    return string.repeat(times);
}

/**
 * Determine if the string ends with the specified substring
 */
function endsWith(haystack: string, needle: string): boolean {
    return haystack.slice(-needle.length) === needle;
}

/**
 * Trim the specified substring off the string
 */
function trimEnd(haystack: string, needle: string): string {
    return endsWith(haystack, needle) ? haystack.slice(0, -needle.length) : haystack;
}

/**
 * Convert a hyphenated string to camelCase
 */
function hyphenToCamelCase(string: string): string {
    return string.replace(/-(.)/g, (_, char) => char.toUpperCase());
}

/**
 * Determines if the specified string consists entirely of whitespace
 */
function isEmpty(string: string): boolean {
    return !/[^\s]/.test(string);
}

/**
 * Determines if the specified string/value is numeric
 */
function isNumeric(input: any): boolean {
    if (input === undefined || input === null) {
        return false;
    }
    return typeof input === "number" || parseInt(input, 10).toString() === input;
}

/**
 * Escapes special characters by converting them to their escaped equivalent
 */
function escapeSpecialChars(value: string): string {
    const tempEl = document.createElement("div");
    tempEl.textContent = value;
    return tempEl.innerHTML;
}

/**
 * Style Parser for inline styles
 */
class StyleParser {
    styles: Record<string, string> = {};

    constructor(rawStyle: string) {
        this.parse(rawStyle);
    }

    /**
     * Parse the specified inline style attribute value
     */
    parse(rawStyle: string): void {
        rawStyle.split(";").forEach((style) => {
            style = style.trim();
            const firstColon = style.indexOf(":");
            if (firstColon === -1) return;

            const key = style.substring(0, firstColon).trim();
            const value = style.substring(firstColon + 1).trim();

            if (key !== "") {
                // Style key should be case insensitive
                const lowerKey = key.toLowerCase();
                this.styles[lowerKey] = value;
            }
        });
    }

    /**
     * Convert the style information to a JSX string
     */
    toJSXString(): string {
        const output: string[] = [];

        Object.keys(this.styles).forEach((key) => {
            const value = this.styles[key];
            output.push(`${this.toJSXKey(key)}: ${this.toJSXValue(value)}`);
        });

        return output.join(", ");
    }

    /**
     * Convert the CSS style key to a JSX style key
     */
    toJSXKey(key: string): string {
        // Don't capitalize -ms- prefix
        if (/^-ms-/.test(key)) {
            key = key.substring(1);
        }
        return hyphenToCamelCase(key);
    }

    /**
     * Convert the CSS style value to a JSX style value
     */
    toJSXValue(value: string): string {
        if (isNumeric(value)) {
            // If numeric, no quotes
            return value;
        } else {
            // Wrap strings in quotes
            return `'${value.replace(/'/g, '"')}'`;
        }
    }
}

/**
 * HTML to JSX Converter
 */
class HTMLtoJSX {
    private config: HTMLtoJSXConfig;

    private output: string = "";
    private level: number = 0;
    private _inPreTag: boolean = false;

    constructor(config: HTMLtoJSXConfig = {}) {
        this.config = {
            indent: config.indent || "  "
        };
    }

    /**
     * Reset the internal state of the converter
     */
    reset(): void {
        this.output = "";
        this.level = 0;
        this._inPreTag = false;
    }

    /**
     * Main entry point to the converter
     */
    convert(html: string): string {
        this.reset();

        const containerEl = document.createElement("div");
        containerEl.innerHTML = `\n${this._cleanInput(html)}\n`;

        if (this._onlyOneTopLevel(containerEl)) {
            // Only one top-level element, the component can return it directly
            this._traverse(containerEl);
        } else {
            // More than one top-level element, need to wrap the whole thing in a container
            this.output += `${this.config.indent}${this.config.indent}`;
            this.level++;
            this._visit(containerEl);
        }

        this.output = this.output.trim() + "\n";

        return this.output;
    }

    /**
     * Cleans up the specified HTML so it's in a format acceptable for converting
     */
    _cleanInput(html: string): string {
        // Remove unnecessary whitespace
        html = html.trim();
        // Strip script tags
        html = html.replace(/<script([\s\S]*?)<\/script>/g, "");
        return html;
    }

    /**
     * Determines if there's only one top-level node in the DOM tree
     */
    _onlyOneTopLevel(containerEl: HTMLElement): boolean {
        // Only a single child element
        if (
            containerEl.childNodes.length === 1 &&
            containerEl.childNodes[0].nodeType === NodeType.ELEMENT
        ) {
            return true;
        }

        // Only one element, and all other children are whitespace
        let foundElement = false;
        for (let i = 0; i < containerEl.childNodes.length; i++) {
            const child = containerEl.childNodes[i];
            if (child.nodeType === NodeType.ELEMENT) {
                if (foundElement) {
                    // Encountered an element after already encountering another one
                    return false;
                } else {
                    foundElement = true;
                }
            } else if (child.nodeType === NodeType.TEXT && !isEmpty(child.textContent || "")) {
                // Contains text content
                return false;
            }
        }
        return true;
    }

    /**
     * Gets a newline followed by the correct indentation for the current nesting level
     */
    _getIndentedNewline(): string {
        return "\n" + repeatString(this.config.indent as string, this.level + 2);
    }

    /**
     * Handles processing the specified node
     */
    _visit(node: ChildNode): void {
        this._beginVisit(node);
        this._traverse(node);
        this._endVisit(node);
    }

    /**
     * Traverses all the children of the specified node
     */
    _traverse(node: Node): void {
        this.level++;
        for (let i = 0; i < node.childNodes.length; i++) {
            this._visit(node.childNodes[i]);
        }
        this.level--;
    }

    /**
     * Handle pre-visit behaviour for the specified node
     */
    _beginVisit(node: Node): void {
        switch (node.nodeType) {
            case NodeType.ELEMENT:
                this._beginVisitElement(node as Element);
                break;
            case NodeType.TEXT:
                this._visitText(node as Text);
                break;
            case NodeType.COMMENT:
                this._visitComment(node as Comment);
                break;
            default:
                console.warn("Unrecognised node type:", node.nodeType);
        }
    }

    /**
     * Handles post-visit behaviour for the specified node
     */
    _endVisit(node: Node): void {
        switch (node.nodeType) {
            case NodeType.ELEMENT:
                this._endVisitElement(node as Element);
                break;
            // No ending tags required for these types
            case NodeType.TEXT:
            case NodeType.COMMENT:
                break;
        }
    }

    /**
     * Handles pre-visit behaviour for the specified element node
     */
    _beginVisitElement(node: Element): void {
        const tagName = jsxTagName(node.tagName);
        const attributes: string[] = [];

        for (let i = 0; i < node.attributes.length; i++) {
            attributes.push(this._getElementAttribute(node, node.attributes[i]));
        }

        if (tagName === "textarea") {
            // Hax: textareas need their inner text moved to a "defaultValue" attribute
            const textareaNode = node as HTMLTextAreaElement;
            attributes.push(`defaultValue={${JSON.stringify(textareaNode.value)}}`);
        }

        if (tagName === "style") {
            // Hax: style tag contents need to be dangerously set
            attributes.push(
                `dangerouslySetInnerHTML={{__html: ${JSON.stringify(node.textContent)} }}`
            );
        }

        if (tagName === "pre") {
            this._inPreTag = true;
        }

        this.output += `<${tagName}`;
        if (attributes.length > 0) {
            this.output += ` ${attributes.join(" ")}`;
        }

        if (!this._isSelfClosing(node)) {
            this.output += ">";
        }
    }

    /**
     * Handles post-visit behaviour for the specified element node
     */
    _endVisitElement(node: Element): void {
        const tagName = jsxTagName(node.tagName);
        // De-indent a bit
        this.output = trimEnd(this.output, this.config.indent as string);

        if (this._isSelfClosing(node)) {
            this.output += " />";
        } else {
            this.output += `</${tagName}>`;
        }

        if (tagName === "pre") {
            this._inPreTag = false;
        }
    }

    /**
     * Determines if this element node should be rendered as a self-closing tag
     */
    _isSelfClosing(node: Element): boolean {
        const tagName = jsxTagName(node.tagName);
        // If it has children, it's not self-closing
        // Exception: All children of a textarea are moved to a "defaultValue" attribute
        // style attributes are dangerously set.
        return !node.firstChild || tagName === "textarea" || tagName === "style";
    }

    /**
     * Handles processing of the specified text node
     */
    _visitText(node: Text): void {
        const parentNode = node.parentNode as Element;
        const parentTag = parentNode && jsxTagName(parentNode.tagName);

        if (parentTag === "textarea" || parentTag === "style") {
            // Ignore text content of textareas and styles, as it will have already been moved
            return;
        }

        let text = escapeSpecialChars(node.textContent || "");

        if (this._inPreTag) {
            // If this text is contained within a <pre>, we need to handle whitespace specially
            text = text.replace(/\r/g, "").replace(/( {2,}|\n|\t|\{|\})/g, (whitespace) => {
                return `{${JSON.stringify(whitespace)}}`;
            });
        } else {
            // Handle any curly braces
            text = text.replace(/(\{|\})/g, (brace) => {
                return `{'${brace}'}`;
            });

            // If there's a newline in the text, adjust the indent level
            if (text.indexOf("\n") > -1) {
                text = text.replace(/\n\s*/g, this._getIndentedNewline());
            }
        }

        this.output += text;
    }

    /**
     * Handles processing of the specified comment node
     */
    _visitComment(node: Comment): void {
        const commentText = node.textContent || "";
        this.output += `{/*${commentText.replace("*/", "* /")}*/}`;
    }

    /**
     * Gets a JSX formatted version of the specified attribute from the node
     */
    _getElementAttribute(node: Element, attribute: Attr): string {
        const attrName = attribute.name;
        const attrValue = attribute.value;

        switch (attrName) {
            case "style":
                return this._getStyleAttribute(attrValue);
            default:
                const tagName = jsxTagName(node.tagName);
                let name =
                    (ELEMENT_ATTRIBUTE_MAPPING[tagName] &&
                        ELEMENT_ATTRIBUTE_MAPPING[tagName][attrName]) ||
                    ATTRIBUTE_MAPPING[attrName] ||
                    attrName;

                let result = name;

                // Numeric values should be output as {123} not "123"
                if (isNumeric(attrValue)) {
                    result += `={${attrValue}}`;
                } else if (attrValue.length > 0) {
                    result += `="${attrValue.replace(/"/g, "&quot;")}"`;
                } else if (attrValue.length === 0 && attrName === "alt") {
                    result += `=""`;
                }

                return result;
        }
    }

    /**
     * Gets a JSX formatted version of the specified element styles
     */
    _getStyleAttribute(styles: string): string {
        const jsxStyles = new StyleParser(styles).toJSXString();
        return `style={{${jsxStyles}}}`;
    }

    /**
     * Removes class-level indention in the JSX output
     */
    _removeJSXClassIndention(output: string, indent: string): string {
        const classIndention = new RegExp(`\\n${indent}${indent}${indent}`, "g");
        return output.replace(classIndention, "\n");
    }
}

export { HTMLtoJSX };
