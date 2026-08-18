#!/usr/bin/env node
import { createRequire as __docketCreateRequire } from 'node:module';
const require = __docketCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/identity.js"(exports) {
    "use strict";
    var ALIAS = /* @__PURE__ */ Symbol.for("yaml.alias");
    var DOC = /* @__PURE__ */ Symbol.for("yaml.document");
    var MAP = /* @__PURE__ */ Symbol.for("yaml.map");
    var PAIR = /* @__PURE__ */ Symbol.for("yaml.pair");
    var SCALAR = /* @__PURE__ */ Symbol.for("yaml.scalar");
    var SEQ = /* @__PURE__ */ Symbol.for("yaml.seq");
    var NODE_TYPE = /* @__PURE__ */ Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
    exports.ALIAS = ALIAS;
    exports.DOC = DOC;
    exports.MAP = MAP;
    exports.NODE_TYPE = NODE_TYPE;
    exports.PAIR = PAIR;
    exports.SCALAR = SCALAR;
    exports.SEQ = SEQ;
    exports.hasAnchor = hasAnchor;
    exports.isAlias = isAlias;
    exports.isCollection = isCollection;
    exports.isDocument = isDocument;
    exports.isMap = isMap;
    exports.isNode = isNode;
    exports.isPair = isPair;
    exports.isScalar = isScalar;
    exports.isSeq = isSeq;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/visit.js"(exports) {
    "use strict";
    var identity = require_identity();
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path) {
      const ctrl = callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = visit_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = visit_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path) {
      const ctrl = await callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = await visitAsync_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path) {
      if (typeof visitor === "function")
        return visitor(key, node, path);
      if (identity.isMap(node))
        return visitor.Map?.(key, node, path);
      if (identity.isSeq(node))
        return visitor.Seq?.(key, node, path);
      if (identity.isPair(node))
        return visitor.Pair?.(key, node, path);
      if (identity.isScalar(node))
        return visitor.Scalar?.(key, node, path);
      if (identity.isAlias(node))
        return visitor.Alias?.(key, node, path);
      return void 0;
    }
    function replaceNode(key, path, node) {
      const parent = path[path.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    exports.visit = visit;
    exports.visitAsync = visitAsync;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/directives.js"(exports) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class _Directives {
      constructor(yaml, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version2] = parts;
            if (version2 === "1.1" || version2 === "1.2") {
              this.yaml.version = version2;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version2);
              onError(6, `Unsupported YAML version ${version2}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports.Directives = Directives;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/anchors.js"(exports) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
          return name;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          prevAnchors ?? (prevAnchors = anchorNames(doc));
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports.anchorIsValid = anchorIsValid;
    exports.anchorNames = anchorNames;
    exports.createNodeAnchors = createNodeAnchors;
    exports.findNewAnchor = findNewAnchor;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/applyReviver.js"(exports) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; ++i) {
            const v0 = val[i];
            const v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0)
              delete val[i];
            else if (v1 !== v0)
              val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports.applyReviver = applyReviver;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/toJS.js"(exports) {
    "use strict";
    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !ctx?.keep)
        return Number(value);
      return value;
    }
    exports.toJS = toJS;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Node.js"(exports) {
    "use strict";
    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count: count2, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count2);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports.NodeBase = NodeBase;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Alias.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node.NodeBase {
      constructor(source) {
        super(identity.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc, ctx) {
        if (ctx?.maxAliasCount === 0)
          throw new ReferenceError("Alias resolution is disabled");
        let nodes;
        if (ctx?.aliasResolveCache) {
          nodes = ctx.aliasResolveCache;
        } else {
          nodes = [];
          visit.visit(doc, {
            Node: (_key, node) => {
              if (identity.isAlias(node) || identity.hasAnchor(node))
                nodes.push(node);
            }
          });
          if (ctx)
            ctx.aliasResolveCache = nodes;
        }
        let found = void 0;
        for (const node of nodes) {
          if (node === this)
            break;
          if (node.anchor === this.source)
            found = node;
        }
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const { anchors: anchors2, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc, ctx);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        let data = anchors2.get(source);
        if (!data) {
          toJS.toJS(source, null, ctx);
          data = anchors2.get(source);
        }
        if (data?.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          data.count += 1;
          if (data.aliasCount === 0)
            data.aliasCount = getAliasCount(doc, source, anchors2);
          if (data.count * data.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(msg);
          }
        }
        return data.res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        let count2 = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count2)
            count2 = c;
        }
        return count2;
      } else if (identity.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports.Alias = Alias;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Scalar.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    var Scalar = class extends Node.NodeBase {
      constructor(value) {
        super(identity.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports.Scalar = Scalar;
    exports.isScalarValue = isScalarValue;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/createNode.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t) => t.identify?.(value) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (identity.isDocument(value))
        value = value.contents;
      if (identity.isNode(value))
        return value;
      if (identity.isPair(value)) {
        const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          ref.anchor ?? (ref.anchor = onAnchor(value));
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName?.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    exports.createNode = createNode;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Collection.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var identity = require_identity();
    var Node = require_Node();
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
    var Collection = class extends Node.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity.isScalar(node) ? node.value : node;
        else
          return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    exports.Collection = Collection;
    exports.collectionFromPath = collectionFromPath;
    exports.isEmptyPath = isEmptyPath;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyComment.js"(exports) {
    "use strict";
    var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
    exports.indentComment = indentComment;
    exports.lineComment = lineComment;
    exports.stringifyComment = stringifyComment;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/foldFlowLines.js"(exports) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text7, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text7;
      if (lineWidth < minContentWidth)
        minContentWidth = 0;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text7.length <= endStep)
        return text7;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text7, i, indent.length);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text7[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text7[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text7, i, indent.length);
          end = i + indent.length + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text7[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text7[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text7;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text7;
      if (onFold)
        onFold();
      let res = text7.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text7.length;
        if (fold === 0)
          res = `
${indent}${text7.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text7[fold]}\\`;
          res += `
${indent}${text7.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text7, i, indent) {
      let end = i;
      let start = i + 1;
      let ch = text7[start];
      while (ch === " " || ch === "	") {
        if (i < start + indent) {
          ch = text7[++i];
        } else {
          do {
            ch = text7[++i];
          } while (ch && ch !== "\n");
          end = i;
          start = i + 1;
          ch = text7[start];
        }
      }
      return end;
    }
    exports.FOLD_BLOCK = FOLD_BLOCK;
    exports.FOLD_FLOW = FOLD_FLOW;
    exports.FOLD_QUOTED = FOLD_QUOTED;
    exports.foldFlowLines = foldFlowLines;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyString.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
      }
      const indentSize = indent ? "2" : "1";
      let header = (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (!literal) {
        const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
        let literalFallback = false;
        const foldOptions = getFoldOptions(ctx, true);
        if (blockQuote !== "folded" && type !== Scalar.Scalar.BLOCK_FOLDED) {
          foldOptions.onOverflow = () => {
            literalFallback = true;
          };
        }
        const body = foldFlowLines.foldFlowLines(`${start}${foldedValue}${end}`, indent, foldFlowLines.FOLD_BLOCK, foldOptions);
        if (!literalFallback)
          return `>${header}
${indent}${body}`;
      }
      value = value.replace(/\n+/g, `$&${indent}`);
      return `|${header}
${indent}${start}${value}${end}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
          return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null)
          throw new Error(`Unsupported default string type ${t}`);
      }
      return res;
    }
    exports.stringifyString = stringifyString;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringify.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trailingComma: false,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity.isScalar(item)) {
        obj = item.value;
        let match = tags.filter((t) => t.identify?.(obj));
        if (match.length > 1) {
          const testMatch = match.filter((t) => t.test);
          if (testMatch.length > 0)
            match = testMatch;
        }
        tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      if (identity.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    exports.createStringifyContext = createStringifyContext;
    exports.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyPair.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key) || !identity.isNode(key) && typeof key === "object") {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n" && valueComment)
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports.stringifyPair = stringifyPair;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/log.js"(exports) {
    "use strict";
    var node_process = __require("process");
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof node_process.emitWarning === "function")
          node_process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports.debug = debug;
    exports.warn = warn;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/merge.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var MERGE_KEY = "<<";
    var merge2 = {
      identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
      default: "key",
      tag: "tag:yaml.org,2002:merge",
      test: /^<<$/,
      resolve: () => Object.assign(new Scalar.Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
      }),
      stringify: () => MERGE_KEY
    };
    var isMergeKey = (ctx, key) => (merge2.identify(key) || identity.isScalar(key) && (!key.type || key.type === Scalar.Scalar.PLAIN) && merge2.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge2.tag && tag.default);
    function addMergeToJSMap(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (identity.isSeq(source))
        for (const it of source.items)
          mergeValue(ctx, map, it);
      else if (Array.isArray(source))
        for (const it of source)
          mergeValue(ctx, map, it);
      else
        mergeValue(ctx, map, source);
    }
    function mergeValue(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (!identity.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    function resolveAliasValue(ctx, value) {
      return ctx && identity.isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
    }
    exports.addMergeToJSMap = addMergeToJSMap;
    exports.isMergeKey = isMergeKey;
    exports.merge = merge2;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports) {
    "use strict";
    var log = require_log();
    var merge2 = require_merge();
    var stringify = require_stringify();
    var identity = require_identity();
    var toJS = require_toJS();
    function addPairToJSMap(ctx, map, { key, value }) {
      if (identity.isNode(key) && key.addToJSMap)
        key.addToJSMap(ctx, map, value);
      else if (merge2.isMergeKey(ctx, key))
        merge2.addMergeToJSMap(ctx, map, value);
      else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity.isNode(key) && ctx?.doc) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports.addPairToJSMap = addPairToJSMap;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/Pair.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity.isNode(key))
          key = key.clone(schema);
        if (identity.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports.Pair = Pair;
    exports.createPair = createPair;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyCollection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          str += line ? `
${indent}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
      const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik?.comment) {
            comment = ik.comment;
          }
        }
        if (comment)
          reqNewline = true;
        let str = stringify.stringify(item, itemCtx, () => comment = null);
        reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
        if (i < items.length - 1) {
          str += ",";
        } else if (ctx.options.trailingComma) {
          if (ctx.options.lineWidth > 0) {
            reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
          }
          if (reqNewline) {
            str += ",";
          }
        }
        if (comment)
          str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        lines.push(str);
        linesAtValue = lines.length;
      }
      const { start, end } = flowChars;
      if (lines.length === 0) {
        return start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
          let str = start;
          for (const line of lines)
            str += line ? `
${indentStep}${indent}${line}` : "\n";
          return `${str}
${indent}${end}`;
        } else {
          return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
    }
    function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    exports.stringifyCollection = stringifyCollection;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLMap.js"(exports) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k = identity.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (identity.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite) {
        let _pair;
        if (identity.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair?.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1)
            this.items.push(_pair);
          else
            this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports.YAMLMap = YAMLMap;
    exports.findPair = findPair;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/map.js"(exports) {
    "use strict";
    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports.map = map;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/nodes/YAMLSeq.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports.YAMLSeq = YAMLSeq;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/seq.js"(exports) {
    "use strict";
    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports.seq = seq;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/string.js"(exports) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string2 = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports.string = string2;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/common/null.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports.nullTag = nullTag;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports.boolTag = boolTag;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyNumber.js"(exports) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    exports.stringifyNumber = stringifyNumber;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/core/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string2 = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string2.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/json/schema.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true$|^false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports) {
    "use strict";
    var node_buffer = __require("buffer");
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof node_buffer.Buffer === "function") {
          return node_buffer.Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        if (!value)
          return "";
        const buf = value;
        let str;
        if (typeof node_buffer.Buffer === "function") {
          str = buf instanceof node_buffer.Buffer ? buf.toString("base64") : node_buffer.Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < buf.length; ++i)
            s += String.fromCharCode(buf[i]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        type ?? (type = Scalar.Scalar.BLOCK_LITERAL);
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports.binary = binary;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (identity.isPair(item))
            continue;
          else if (identity.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports.createPairs = createPairs;
    exports.pairs = pairs;
    exports.resolvePairs = resolvePairs;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports) {
    "use strict";
    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports.YAMLOMap = YAMLOMap;
    exports.omap = omap;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports.falseTag = falseTag;
    exports.trueTag = trueTag;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intBin = intBin;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports.YAMLSet = YAMLSet;
    exports.set = set;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = (n) => asBigInt ? BigInt(n) : Number(n);
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = (n) => n;
      if (typeof value === "bigint")
        num = (n) => BigInt(n);
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
    };
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.timestamp = timestamp;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string2 = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var merge2 = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string2.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      merge2.merge,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/tags.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string2 = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var merge2 = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string2.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      merge: merge2.merge,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:merge": merge2.merge,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName, addMergeTag) {
      const schemaTags = schemas.get(schemaName);
      if (schemaTags && !customTags) {
        return addMergeTag && !schemaTags.includes(merge2.merge) ? schemaTags.concat(merge2.merge) : schemaTags.slice();
      }
      let tags = schemaTags;
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      if (addMergeTag)
        tags = tags.concat(merge2.merge);
      return tags.reduce((tags2, tag) => {
        const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
        if (!tagObj) {
          const tagName = JSON.stringify(tag);
          const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
        }
        if (!tags2.includes(tagObj))
          tags2.push(tagObj);
        return tags2;
      }, []);
    }
    exports.coreKnownTags = coreKnownTags;
    exports.getTags = getTags;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/schema/Schema.js"(exports) {
    "use strict";
    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string2 = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema = class _Schema {
      constructor({ compat, customTags, merge: merge2, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name, merge2);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity.MAP, { value: map.map });
        Object.defineProperty(this, identity.SCALAR, { value: string2.string });
        Object.defineProperty(this, identity.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports.Schema = Schema;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/stringify/stringifyDocument.js"(exports) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      const lines = [];
      let hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify.createStringifyContext(doc, options);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if (doc.directives?.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports.stringifyDocument = stringifyDocument;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/doc/Document.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          stringKeys: false,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version: version2 } = opt;
        if (options?._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit)
            version2 = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version: version2 });
        this.setSchema(version2, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity.NODE_TYPE]: { value: identity.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair.Pair(k, v);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
          return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity.isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path) {
        if (Collection.isEmptyPath(path))
          return this.contents !== void 0;
        return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        if (Collection.isEmptyPath(path)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version2, options = {}) {
        if (typeof version2 === "number")
          version2 = String(version2);
        let opt;
        switch (version2) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version2;
            else
              this.directives = new directives.Directives({ version: version2 });
            opt = { resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version2);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object)
          this.schema = options.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count: count2, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count2);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
      }
    };
    function assertCollection(contents) {
      if (identity.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports.Document = Document;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/errors.js"(exports) {
    "use strict";
    var YAMLError = class extends Error {
      constructor(name, pos, code, message2) {
        super();
        this.name = name;
        this.code = code;
        this.message = message2;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code, message2) {
        super("YAMLParseError", pos, code, message2);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code, message2) {
        super("YAMLWarning", pos, code, message2);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count2 = 1;
        const end = error.linePos[1];
        if (end?.line === line && end.col > col) {
          count2 = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count2);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports.YAMLError = YAMLError;
    exports.YAMLParseError = YAMLParseError;
    exports.YAMLWarning = YAMLWarning;
    exports.prettifyError = prettifyError;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-props.js"(exports) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let reqSpace = false;
      let tab = null;
      let anchor = null;
      let tag = null;
      let newlineAfterProp = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        if (tab) {
          if (atNewline && token.type !== "comment" && token.type !== "newline") {
            onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
          }
          tab = null;
        }
        switch (token.type) {
          case "space":
            if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
              tab = token;
            }
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else if (!found || indicator !== "seq-item-ind")
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              newlineAfterProp = token;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          // else fallthrough
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      }
      if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        anchor,
        tag,
        newlineAfterProp,
        end,
        start: start ?? end
      };
    }
    exports.resolveProps = resolveProps;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-contains-newline.js"(exports) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports.containsNewline = containsNewline;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if (fc?.type === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports.flowIndentCheck = flowIndentCheck;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-map-includes.js"(exports) {
    "use strict";
    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value;
      return items.some((pair) => isEqual(pair.key, search));
    }
    exports.mapIncludes = mapIncludes;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-map.js"(exports) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: bm.indent,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.newlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (keyProps.found?.indent !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        ctx.atKey = true;
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        ctx.atKey = false;
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: bm.indent,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if (value?.type === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports.resolveBlockMap = resolveBlockMap;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-seq.js"(exports) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          parentIndent: bs.indent,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value?.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports.resolveBlockSeq = resolveBlockSeq;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-end.js"(exports) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports.resolveEnd = resolveEnd;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: fc.indent,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop: for (const st of start) {
              switch (st.type) {
                case "comma":
                case "space":
                  break;
                case "comment":
                  prevItemComment = st.source.substring(1);
                  break loop;
                default:
                  break loop;
              }
            }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          ctx.atKey = true;
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          ctx.atKey = false;
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            parentIndent: fc.indent,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep)
                for (const st of sep) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source?.[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            const endRange = (valueNode ?? keyNode).range;
            map.range = [keyNode.range[0], endRange[1], endRange[2]];
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce?.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports.resolveFlowCollection = resolveFlowCollection;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-collection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, props, onError) {
      const tagToken = props.tag;
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      if (token.type === "block-seq") {
        const { anchor, newlineAfterProp: nl } = props;
        const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
        if (lastProp && (!nl || nl.offset < lastProp.offset)) {
          const message2 = "Missing newline after block sequence props";
          onError(lastProp, "MISSING_CHAR", message2);
        }
      }
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq") {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt?.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          if (kt) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
      const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag?.format)
        node.format = tag.format;
      return node;
    }
    exports.composeCollection = composeCollection;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(ctx, scalar, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === "" || content === "\r")
          chompStart = i;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent)
            trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            const message2 = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message2);
          }
          if (header.indent === 0)
            trimIndent = indent.length;
          contentStart = i;
          if (trimIndent === 0 && !ctx.atRoot) {
            const message2 = "Block scalar values in collections must be indented";
            onError(offset, "BAD_INDENT", message2);
          }
          break;
        }
        offset += indent.length + content.length + 1;
      }
      for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
          chompStart = i + 1;
      }
      let value = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + "\n";
      for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message2 = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message2);
          indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value += "\n";
          else
            sep = "\n";
        } else {
          value += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i = chompStart; i < lines.length; ++i)
            value += "\n" + lines[i][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent = 0;
      let chomp = "";
      let error = -1;
      for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent && n)
            indent = n;
          else if (error === -1)
            error = offset + i;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
          case "space":
            hasSpace = true;
          // fallthrough
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message2 = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message2);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          /* istanbul ignore next should not happen */
          default: {
            const message2 = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message2);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent, chomp, comment, length };
    }
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m = first.match(/^( *)/);
      const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      const lines = [line0];
      for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
      return lines;
    }
    exports.resolveBlockScalar = resolveBlockScalar;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        /* istanbul ignore next should not happen */
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        /* istanbul ignore next should not happen */
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return foldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return foldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function foldLines(source) {
      let first, line;
      try {
        first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
        line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
      } catch {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
      }
      let match = first.exec(source);
      if (!match)
        return source;
      let res = match[1];
      let sep = " ";
      let pos = first.lastIndex;
      line.lastIndex = pos;
      while (match = line.exec(source)) {
        if (match[1] === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + match[1];
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + (match?.[1] ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i);
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          let next = source[++i];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = next === "x" ? 2 : next === "u" ? 4 : 8;
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            const raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i;
          let next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
          if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
            res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      // null character
      a: "\x07",
      // bell character
      b: "\b",
      // backspace
      e: "\x1B",
      // escape character
      f: "\f",
      // form feed
      n: "\n",
      // line feed
      r: "\r",
      // carriage return
      t: "	",
      // horizontal tab
      v: "\v",
      // vertical tab
      N: "\x85",
      // Unicode next line
      _: "\xA0",
      // Unicode non-breaking space
      L: "\u2028",
      // Unicode line separator
      P: "\u2029",
      // Unicode paragraph separator
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok2 = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code = ok2 ? parseInt(cc, 16) : NaN;
      try {
        return String.fromCodePoint(code);
      } catch {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
    }
    exports.resolveFlowScalar = resolveFlowScalar;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-scalar.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(ctx, token, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      let tag;
      if (ctx.options.stringKeys && ctx.atKey) {
        tag = ctx.schema[identity.SCALAR];
      } else if (tagName)
        tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
      else if (token.type === "scalar")
        tag = findScalarTagByTest(ctx, value, token, onError);
      else
        tag = ctx.schema[identity.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!")
        return schema[identity.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if (tag.test?.test(value))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema[identity.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports.composeScalar = composeScalar;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        pos ?? (pos = before.length);
        for (let i = pos - 1; i >= 0; --i) {
          let st = before[i];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i];
          while (st?.type === "space") {
            offset += st.source.length;
            st = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    exports.emptyScalarPosition = emptyScalarPosition;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-node.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const atKey = ctx.atKey;
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          try {
            node = composeCollection.composeCollection(CN, ctx, token, props, onError);
            if (anchor)
              node.anchor = anchor.source.substring(1);
          } catch (error) {
            const message2 = error instanceof Error ? error.message : String(error);
            onError(token, "RESOURCE_EXHAUSTION", message2);
          }
          break;
        default: {
          const message2 = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message2);
          isSrcToken = false;
        }
      }
      node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (atKey && ctx.options.stringKeys && (!identity.isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
        const msg = "With stringKeys, all keys must be strings";
        onError(tag ?? token, "NON_STRING_KEY", msg);
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    exports.composeEmptyNode = composeEmptyNode;
    exports.composeNode = composeNode;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/compose-doc.js"(exports) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, { offset, start, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atKey: false,
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value ?? end?.[0],
        offset,
        onError,
        parentIndent: 0,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports.composeDoc = composeDoc;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/compose/composer.js"(exports) {
    "use strict";
    var node_process = __require("process");
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (prelude[i + 1]?.[0] !== "#")
              i += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message2, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code, message2));
          else
            this.errors.push(new errors.YAMLParseError(pos, code, message2));
        };
        this.directives = new directives.Directives({ version: options.version || "1.2" });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          for (let i = 0; i < this.errors.length; ++i)
            doc.errors.push(this.errors[i]);
          for (let i = 0; i < this.warnings.length; ++i)
            doc.warnings.push(this.warnings[i]);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (node_process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message2, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message2, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports.Composer = Composer;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-scalar.js"(exports) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code, message2) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code, message2);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code, message2);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent, source: "\n" });
          return { type: "block-scalar", offset, indent, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent, source, end };
        default:
          return { type: "scalar", offset, indent, source, end };
      }
    }
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number")
        indent += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent, props, source: body });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent, source, end });
        }
      }
    }
    exports.createScalarToken = createScalarToken;
    exports.resolveAsScalar = resolveAsScalar;
    exports.setScalarValue = setScalarValue;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-stringify.js"(exports) {
    "use strict";
    var stringify = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    function stringifyItem({ start, key, sep, value }) {
      let res = "";
      for (const st of start)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st of sep)
          res += st.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    exports.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst-visit.js"(exports) {
    "use strict";
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path) => {
      let item = cst;
      for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path) => {
      const parent = visit.itemAtPath(cst, path.slice(0, -1));
      const field = path[path.length - 1][0];
      const coll = parent?.[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path, item, visitor) {
      let ctrl = visitor(item, path);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i = 0; i < token.items.length; ++i) {
            const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
    }
    exports.visit = visit;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/cst.js"(exports) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = (token) => !!token && "items" in token;
    var isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports.createScalarToken = cstScalar.createScalarToken;
    exports.resolveAsScalar = cstScalar.resolveAsScalar;
    exports.setScalarValue = cstScalar.setScalarValue;
    exports.stringify = cstStringify.stringify;
    exports.visit = cstVisit.visit;
    exports.BOM = BOM;
    exports.DOCUMENT = DOCUMENT;
    exports.FLOW_END = FLOW_END;
    exports.SCALAR = SCALAR;
    exports.isCollection = isCollection;
    exports.isScalar = isScalar;
    exports.prettyToken = prettyToken;
    exports.tokenType = tokenType;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/lexer.js"(exports) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = new Set("0123456789ABCDEFabcdef");
    var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
    var flowIndicatorChars = new Set(",[]{}");
    var invalidAnchorChars = new Set(" ,[]{}\n\r	");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
    var Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          if (typeof source !== "string")
            throw TypeError("source is not a string");
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ")
            ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          let cs = line.indexOf("#");
          while (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	") {
              dirEnd = cs - 1;
              break;
            } else {
              cs = line.indexOf("#", cs + 1);
            }
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s = this.peek(3);
          if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return s === "---" ? "doc" : "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return "block-start";
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          // fallthrough
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          // fallthrough
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent = 0;
        let ch;
        loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
          switch (ch) {
            case " ":
              indent += 1;
              break;
            case "\n":
              nl = i2;
              indent = 0;
              break;
            case "\r": {
              const next = this.buffer[i2 + 1];
              if (!next && !this.atEnd)
                return this.setNext("block-scalar");
              if (next === "\n")
                break;
            }
            // fallthrough
            default:
              break loop;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent;
          else {
            this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
          }
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        let i = nl + 1;
        ch = this.buffer[i];
        while (ch === " ")
          ch = this.buffer[++i];
        if (ch === "	") {
          while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
            ch = this.buffer[++i];
          nl = i - 1;
        } else if (!this.blockScalarKeep) {
          do {
            let i2 = nl - 1;
            let ch2 = this.buffer[i2];
            if (ch2 === "\r")
              ch2 = this.buffer[--i2];
            const lastChar = i2;
            while (ch2 === " ")
              ch2 = this.buffer[--i2];
            if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
              nl = i2;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
              break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else
                end = i;
            }
            if (next === "#" || inFlow && flowIndicatorChars.has(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1)
                break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && flowIndicatorChars.has(ch))
              break;
            end = i;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        let n = 0;
        loop: while (true) {
          switch (this.charAt(0)) {
            case "!":
              n += yield* this.pushTag();
              n += yield* this.pushSpaces(true);
              continue loop;
            case "&":
              n += yield* this.pushUntil(isNotAnchorChar);
              n += yield* this.pushSpaces(true);
              continue loop;
            case "-":
            // this is an error
            case "?":
            // this is an error outside flow collections
            case ":": {
              const inFlow = this.flowLevel > 0;
              const ch1 = this.charAt(1);
              if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
                if (!inFlow)
                  this.indentNext = this.indentValue + 1;
                else if (this.flowKey)
                  this.flowKey = false;
                n += yield* this.pushCount(1);
                n += yield* this.pushSpaces(true);
                continue loop;
              }
            }
          }
          break loop;
        }
        return n;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.has(ch))
              ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i;
        }
        return n;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
          ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
    exports.Lexer = Lexer;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/line-counter.js"(exports) {
    "use strict";
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports.LineCounter = LineCounter;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/parse/parser.js"(exports) {
    "use strict";
    var node_process = __require("process");
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token?.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        /* istanbul ignore next should not happen */
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0)
        return [];
      let i = prev.length;
      loop: while (--i >= 0) {
        switch (prev[i].type) {
          case "doc-start":
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
          case "newline":
            break loop;
        }
      }
      while (prev[++i]?.type === "space") {
      }
      return prev.splice(i, prev.length);
    }
    function arrayPushArray(target, source) {
      if (source.length < 1e5)
        Array.prototype.push.apply(target, source);
      else
        for (let i = 0; i < source.length; ++i)
          target.push(source[i]);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                arrayPushArray(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              arrayPushArray(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser = class {
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (node_process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message2 = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message: message2, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && top?.type !== "doc-end") {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message2 = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message: message2 };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !it.explicitKey;
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            /* istanbul ignore next should not happen */
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          /* istanbul ignore next should not happen */
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atMapIndent = !this.onKeyLine && this.indent === map.indent;
          const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st = it.sep[i];
              switch (st.type) {
                case "newline":
                  nl.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !it.explicitKey) {
                it.start.push(this.sourceToken);
                it.explicitKey = true;
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start, explicitKey: true });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken], explicitKey: true }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (it.explicitKey) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key;
                  delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs);
              } else {
                Object.assign(it, { key: fs, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (bv.type === "block-seq") {
                  if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                    yield* this.pop({
                      type: "error",
                      offset: this.offset,
                      message: "Unexpected block-seq-ind on same line with key",
                      source: this.source
                    });
                    return;
                  }
                } else if (atMapIndent) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top?.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs, sep: [] });
              else if (it.sep)
                this.stack.push(fs);
              else
                Object.assign(it, { key: fs, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, explicitKey: true }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent)
          return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          // fallthrough
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports.Parser = Parser;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/public-api.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log = require_log();
    var identity = require_identity();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options) {
      const prettyErrors = options.prettyErrors !== false;
      const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse(src, reviver, options) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && typeof reviver === "object") {
        options = reviver;
      }
      const doc = parseDocument(src, options);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options));
    }
    function stringify(value, replacer, options) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string")
        options = options.length;
      if (typeof options === "number") {
        const indent = Math.round(options);
        options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
      }
      if (value === void 0) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      if (identity.isDocument(value) && !_replacer)
        return value.toString(options);
      return new Document.Document(value, _replacer, options).toString(options);
    }
    exports.parse = parse;
    exports.parseAllDocuments = parseAllDocuments;
    exports.parseDocument = parseDocument;
    exports.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/dist/index.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports.Composer = composer.Composer;
    exports.Document = Document.Document;
    exports.Schema = Schema.Schema;
    exports.YAMLError = errors.YAMLError;
    exports.YAMLParseError = errors.YAMLParseError;
    exports.YAMLWarning = errors.YAMLWarning;
    exports.Alias = Alias.Alias;
    exports.isAlias = identity.isAlias;
    exports.isCollection = identity.isCollection;
    exports.isDocument = identity.isDocument;
    exports.isMap = identity.isMap;
    exports.isNode = identity.isNode;
    exports.isPair = identity.isPair;
    exports.isScalar = identity.isScalar;
    exports.isSeq = identity.isSeq;
    exports.Pair = Pair.Pair;
    exports.Scalar = Scalar.Scalar;
    exports.YAMLMap = YAMLMap.YAMLMap;
    exports.YAMLSeq = YAMLSeq.YAMLSeq;
    exports.CST = cst;
    exports.Lexer = lexer.Lexer;
    exports.LineCounter = lineCounter.LineCounter;
    exports.Parser = parser.Parser;
    exports.parse = publicApi.parse;
    exports.parseAllDocuments = publicApi.parseAllDocuments;
    exports.parseDocument = publicApi.parseDocument;
    exports.stringify = publicApi.stringify;
    exports.visit = visit.visit;
    exports.visitAsync = visit.visitAsync;
  }
});

// src/lib/shared/meta/meta.ts
var PRODUCT_NAME = "docket";

// src/lib/shared/result/docket-error.ts
var ErrorCode = {
  /** The first positional argument is not a command Docket knows. */
  unknownCommand: "unknown_command",
  /** A flag was misspelled, unknown, or given the wrong kind of value. */
  invalidOption: "invalid_option",
  /** A flag the command cannot run without was not given at all. */
  missingOption: "missing_option",
  /** git refused the request: an unknown ref, a broken or missing repository. */
  gitFailed: "git_failed",
  /** A real change Docket cannot classify yet, and refuses to leave out. */
  unsupportedChange: "unsupported_change",
  /** A path inside the source directory that maps to no known metadata type. */
  unsupportedMetadata: "unsupported_metadata",
  /** `docket.yml` is unreadable, malformed, or says something Docket rejects. */
  invalidConfig: "invalid_config",
  /** The run asked for an environment `docket.yml` does not define. */
  unknownEnvironment: "unknown_environment",
  /** The pull request targets a branch the chosen environment does not deploy. */
  branchMismatch: "branch_mismatch",
  /** The plan deletes metadata in an environment whose policy forbids it. */
  destructiveNotAllowed: "destructive_not_allowed",
  /** The Salesforce CLI could not be run or answered something unreadable. */
  salesforceFailed: "salesforce_failed",
  /** The configured org cannot be reached, or is not authenticated. */
  orgUnavailable: "org_unavailable",
  /** The org in front of Docket is not the org the plan was validated against. */
  orgMismatch: "org_mismatch",
  /** An artifact about to be written contains credential-shaped text. */
  secretInArtifact: "secret_in_artifact",
  /** The plan offered for deployment is not the plan that was validated. */
  planMismatch: "plan_mismatch",
  /** Deployment was asked for a run whose validation did not pass. */
  validationNotPassed: "validation_not_passed",
  /** GitHub could not be reached, or refused the request. */
  githubFailed: "github_failed",
  /** The pull request is a fork, a draft, closed, or otherwise out of scope. */
  pullRequestNotEligible: "pull_request_not_eligible",
  /** A required manual step has not been completed for this exact plan. */
  stepIncomplete: "step_incomplete",
  /** A completed step cannot be completed again: its record is immutable. */
  stepAlreadyCompleted: "step_already_completed",
  /** A recorded run is not a successful deployment that rollback may invert. */
  rollbackSourceInvalid: "rollback_source_invalid",
  /** A later repository change overlaps the deployment a rollback would undo. */
  rollbackConflict: "rollback_conflict",
  /** Run artifacts cannot be assembled into one trustworthy deployment history. */
  historyInvalid: "history_invalid"
};
function docketError(code, message2) {
  return { code, message: message2 };
}

// src/lib/shared/result/result.ts
function ok(value) {
  return { ok: true, value };
}
function err(error) {
  return { ok: false, error };
}

// src/lib/features/cli/commands/command.ts
function defineCommand(definition) {
  return {
    name: definition.name,
    summary: definition.summary,
    flags: definition.flags,
    // The only cast in the dispatch path, and a safe one: argv is parsed
    // with exactly these flags, so the erased record holds exactly the
    // options the command declared.
    run: (values, context) => definition.run(values, context)
  };
}
var GLOBAL_FLAGS = {
  help: { type: "boolean", short: "h", description: "Show this help" },
  version: { type: "boolean", short: "v", description: "Show the version" },
  json: { type: "boolean", description: "Emit machine-readable output on stdout" }
};

// src/lib/features/git/commit-sha.ts
var FULL_COMMIT_SHA = /^[0-9a-f]{40}$/i;
function isCommitSha(value) {
  return typeof value === "string" && FULL_COMMIT_SHA.test(value);
}
function parseCommitSha(value, label, code) {
  return isCommitSha(value) ? ok(value.toLowerCase()) : err(docketError(code, `${label} must be a full 40-character commit SHA`));
}

// src/lib/shared/process/run-process.ts
import { spawn } from "node:child_process";
var GRACE_MS = 2e3;
function runProcess(command, args, options = {}) {
  return new Promise((resolve) => {
    let child;
    try {
      child = spawn(command, [...args], {
        cwd: options.cwd,
        env: environmentOf(options),
        shell: false
      });
    } catch (error) {
      resolve(startFailure(error));
      return;
    }
    let stdout = "";
    let stderr = "";
    let terminatedBy = null;
    let settled = false;
    let timer;
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    const terminate = (reason) => {
      if (terminatedBy !== null) return;
      terminatedBy = reason;
      child.kill("SIGTERM");
      const insist = setTimeout(() => child.kill("SIGKILL"), GRACE_MS);
      insist.unref();
      child.once("close", () => clearTimeout(insist));
    };
    timer = options.timeoutMs === void 0 ? void 0 : setTimeout(() => terminate("timeout"), options.timeoutMs);
    const onAbort = () => terminate("cancellation");
    options.signal?.addEventListener("abort", onAbort, { once: true });
    if (options.signal?.aborted === true) terminate("cancellation");
    const finish = (result) => {
      if (settled) return;
      settled = true;
      if (timer !== void 0) clearTimeout(timer);
      options.signal?.removeEventListener("abort", onAbort);
      resolve(result);
    };
    child.on("error", (error) => {
      finish({ stdout, stderr, exitCode: 127, terminatedBy: null, startError: messageOf(error) });
    });
    child.on("close", (code, signal) => {
      finish({
        stdout,
        stderr,
        exitCode: code ?? terminationCode(signal),
        terminatedBy,
        startError: null
      });
    });
  });
}
function startFailure(error) {
  return { stdout: "", stderr: "", exitCode: 127, terminatedBy: null, startError: messageOf(error) };
}
function messageOf(error) {
  return error instanceof Error ? error.message : String(error);
}
function environmentOf(options) {
  if (options.env === void 0 && options.removeEnv === void 0) return process.env;
  const environment = { ...process.env, ...options.env };
  for (const name of options.removeEnv ?? []) delete environment[name];
  return environment;
}
function terminationCode(signal) {
  return signal === null ? 1 : 128;
}

// src/lib/features/git/git-command.ts
var ISOLATED_GIT_ENV = {
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_SYSTEM: "/dev/null",
  GIT_TERMINAL_PROMPT: "0",
  LC_ALL: "C"
};
function runGit(args, options) {
  return runProcess("git", args, {
    cwd: options.cwd,
    env: { ...ISOLATED_GIT_ENV, ...options.env }
  });
}

// src/lib/features/git/read-changes.ts
async function readChanges(request) {
  const base = parseCommitSha(request.baseSha, "base SHA", ErrorCode.gitFailed);
  if (!base.ok) return base;
  const head = parseCommitSha(request.headSha, "head SHA", ErrorCode.gitFailed);
  if (!head.ok) return head;
  const result = await runGit(
    [
      "diff",
      "--name-status",
      "--find-renames",
      "-z",
      "--end-of-options",
      base.value,
      head.value,
      "--"
    ],
    { cwd: request.cwd }
  );
  if (result.startError !== null || result.exitCode !== 0) {
    return err(
      docketError(
        ErrorCode.gitFailed,
        `git diff failed (${result.exitCode}): ${result.startError ?? firstLine(result.stderr)}`
      )
    );
  }
  return parseNameStatus(result.stdout);
}
var STATUS_BY_LETTER = {
  A: "added",
  M: "modified",
  D: "deleted",
  R: "renamed"
};
function parseNameStatus(stdout) {
  const fields = stdout.split("\0");
  if (fields.at(-1) === "") fields.pop();
  const changes = [];
  let index = 0;
  while (index < fields.length) {
    const marker = fields[index];
    if (marker === void 0 || marker === "") return err(incompleteRecord());
    index += 1;
    const status = STATUS_BY_LETTER[marker.charAt(0)];
    if (status === void 0) {
      return err(docketError(ErrorCode.unsupportedChange, `unsupported change status: ${marker}`));
    }
    if (status === "renamed") {
      const previousPath = fields[index];
      const path2 = fields[index + 1];
      if (!previousPath || !path2) return err(incompleteRecord());
      index += 2;
      changes.push({ status, path: path2, previousPath });
      continue;
    }
    const path = fields[index];
    if (!path) return err(incompleteRecord());
    index += 1;
    changes.push({ status, path });
  }
  return ok(changes);
}
function incompleteRecord() {
  return docketError(ErrorCode.gitFailed, "git diff produced an incomplete record");
}
function firstLine(stderr) {
  return stderr.trim().split("\n")[0] ?? "";
}

// src/lib/features/cli/commands/flags.ts
var FLAGS = {
  repo: {
    type: "string",
    description: "Repository to read (default: current directory)"
  },
  base: {
    type: "string",
    description: "Full SHA of the base commit"
  },
  head: {
    type: "string",
    description: "Full SHA of the head commit"
  },
  repository: {
    type: "string",
    description: "GitHub repository as owner/name"
  },
  "pull-request": {
    type: "string",
    description: "Pull request number"
  },
  environment: {
    type: "string",
    description: "Environment id from docket.yml"
  },
  "target-branch": {
    type: "string",
    description: "Branch the pull request targets"
  },
  "org-id": {
    type: "string",
    description: "Skip org resolution and bind the plan to this org id"
  },
  out: {
    type: "string",
    description: "Directory for run artifacts"
  },
  sf: {
    type: "string",
    description: "Salesforce CLI executable (default: sf)"
  },
  wait: {
    type: "string",
    description: "Minutes to wait for Salesforce (default: 33)"
  },
  failed: {
    type: "string",
    description: "Publish a failing check for a run that recorded nothing"
  },
  "validated-run": {
    type: "string",
    description: "Artifacts directory of the validation to deploy"
  },
  "gates-run": {
    type: "string",
    description: "Artifacts directory of credential-free passing gates"
  },
  "merge-commit": {
    type: "string",
    description: "Commit GitHub produced by merging the pull request"
  },
  "github-token": {
    type: "string",
    description: "GitHub token (prefer GITHUB_TOKEN in the environment)"
  },
  "require-merged": {
    type: "boolean",
    description: "Verify with GitHub that the pull request was merged"
  },
  "workflow-run-id": {
    type: "string",
    description: "Workflow run the validation artifacts belong to"
  },
  "workflow-run-attempt": {
    type: "string",
    description: "Attempt number for that workflow run"
  },
  "expected-plan-identity": {
    type: "string",
    description: "Plan identity selected by the green check"
  },
  "artifacts-expire-at": {
    type: "string",
    description: "ISO-8601 instant this run's artifacts expire"
  },
  "details-url": {
    type: "string",
    description: "Link the published check points at"
  },
  steps: {
    type: "string",
    description: "Directory of manual-step completion records"
  },
  step: {
    type: "string",
    description: "Name of the manual step being completed"
  },
  by: {
    type: "string",
    description: "Who completed that step"
  },
  run: {
    type: "string",
    description: "Recorded deployment artifacts selected for rollback"
  },
  runs: {
    type: "string",
    description: "Root containing deployment run artifact directories"
  },
  "create-pr": {
    type: "boolean",
    description: "Publish the rollback as a new GitHub pull request"
  }
};
function flagsFor(...names) {
  return Object.fromEntries(names.map((name) => [name, FLAGS[name]]));
}
var FLAG_NAMES = Object.keys(FLAGS);

// src/lib/features/cli/commands/option.ts
function requiredOption(value, flag) {
  if (value === void 0 || value === "") {
    return err(docketError(ErrorCode.missingOption, `missing required option: ${flag}`));
  }
  return ok(value);
}

// src/lib/features/cli/commands/changes/changes-command.ts
var flags = flagsFor("repo", "base", "head");
var changesCommand = defineCommand({
  name: "changes",
  summary: "List the metadata changes between two exact commits",
  flags,
  run: async (options, context) => {
    const base = requiredOption(options.base, "--base");
    if (!base.ok) return base;
    const baseSha = parseCommitSha(base.value, "--base", ErrorCode.invalidOption);
    if (!baseSha.ok) return baseSha;
    const head = requiredOption(options.head, "--head");
    if (!head.ok) return head;
    const headSha = parseCommitSha(head.value, "--head", ErrorCode.invalidOption);
    if (!headSha.ok) return headSha;
    const result = await readChanges({
      cwd: options.repo ?? context.cwd,
      baseSha: baseSha.value,
      headSha: headSha.value
    });
    return result.ok ? ok({ kind: "changes", changes: result.value }) : result;
  }
});

// src/lib/features/github/github-client.ts
var GITHUB_API_URL = "https://api.github.com";
var API_VERSION = "2022-11-28";
async function githubRequest(client, request) {
  const call = client.fetch ?? globalThis.fetch;
  const url = `${client.baseUrl ?? GITHUB_API_URL}${request.path}`;
  let response;
  try {
    response = await call(url, {
      method: request.method,
      headers: {
        accept: request.accept ?? "application/vnd.github+json",
        authorization: `Bearer ${client.token}`,
        "x-github-api-version": API_VERSION,
        "user-agent": "docket",
        ...request.body === void 0 ? {} : { "content-type": "application/json" }
      },
      ...request.body === void 0 ? {} : { body: JSON.stringify(request.body) }
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return err(docketError(ErrorCode.githubFailed, `${request.method} ${request.path}: ${detail}`));
  }
  const text7 = await response.text().catch(() => "");
  const body = parseJson(text7);
  if (!response.ok) {
    return err(
      docketError(
        ErrorCode.githubFailed,
        `${request.method} ${request.path} failed with ${response.status}: ${messageOf2(body)}`
      )
    );
  }
  return ok({ status: response.status, body });
}
function parseJson(text7) {
  if (text7 === "") return void 0;
  try {
    return JSON.parse(text7);
  } catch {
    return text7;
  }
}
function messageOf2(body) {
  if (typeof body === "object" && body !== null && "message" in body) {
    const message2 = body.message;
    if (typeof message2 === "string") return message2;
  }
  return "no message";
}

// src/lib/features/github/checks.ts
var VALIDATION_CHECK_NAME = "docket/validate";
var STEP_CHECK_SCHEMA = "docket.step-check/v1";
async function publishValidationCheck(client, request) {
  if (request.planIdentity === null && request.verdict === "passed") {
    return err(
      docketError(ErrorCode.planMismatch, "refusing to publish a passing check for no plan")
    );
  }
  const externalId = request.planIdentity === null ? void 0 : encodeExternalId(request.workflowRunId, request.planIdentity);
  const response = await githubRequest(client, {
    method: "POST",
    path: `/repos/${request.repository}/check-runs`,
    body: {
      name: VALIDATION_CHECK_NAME,
      head_sha: request.headSha,
      status: "completed",
      conclusion: request.verdict === "passed" ? "success" : "failure",
      ...externalId === void 0 ? {} : { external_id: externalId },
      ...request.detailsUrl === void 0 ? {} : { details_url: request.detailsUrl },
      output: {
        title: request.verdict === "passed" ? "Validation passed" : "Validation failed",
        summary: request.summary
      }
    }
  });
  if (!response.ok) return response;
  const body = asRecord(response.value.body);
  const id = typeof body?.["id"] === "number" ? body["id"] : void 0;
  if (id === void 0) {
    return err(docketError(ErrorCode.githubFailed, "GitHub accepted no check run"));
  }
  return ok({
    id,
    name: text(body?.["name"]) ?? VALIDATION_CHECK_NAME,
    headSha: text(body?.["head_sha"]) ?? request.headSha,
    conclusion: text(body?.["conclusion"]) ?? "",
    externalId: externalId ?? ""
  });
}
async function publishStepCheck(client, request) {
  const externalId = encodeStepCheck({
    schema: STEP_CHECK_SCHEMA,
    step: request.step,
    planIdentity: request.planIdentity,
    validationWorkflowRunId: request.validationWorkflowRunId,
    completionWorkflowRunId: null
  });
  const response = await githubRequest(client, {
    method: "POST",
    path: `/repos/${request.repository}/check-runs`,
    body: {
      name: stepCheckName(request.step),
      head_sha: request.headSha,
      status: "in_progress",
      external_id: externalId,
      ...request.detailsUrl === void 0 ? {} : { details_url: request.detailsUrl },
      output: {
        title: "Waiting for a person",
        summary: `Manual step \`${request.step}\` has not been completed yet.`
      }
    }
  });
  if (!response.ok) return response;
  const body = asRecord(response.value.body);
  const id = typeof body?.["id"] === "number" ? body["id"] : void 0;
  if (id === void 0) {
    return err(docketError(ErrorCode.githubFailed, "GitHub accepted no manual-step check run"));
  }
  return ok({
    id,
    name: stepCheckName(request.step),
    headSha: request.headSha,
    conclusion: "",
    externalId
  });
}
async function completeStepCheck(client, request) {
  const pending = await matchingStepCheck(
    client,
    request.repository,
    request.headSha,
    request.step,
    (identity2) => identity2.planIdentity === request.planIdentity && identity2.completionWorkflowRunId === null
  );
  if (!pending.ok) return pending;
  const identity = {
    ...pending.value.identity,
    completionWorkflowRunId: request.completionWorkflowRunId
  };
  const externalId = encodeStepCheck(identity);
  const response = await githubRequest(client, {
    method: "PATCH",
    path: `/repos/${request.repository}/check-runs/${pending.value.id}`,
    body: {
      status: "completed",
      conclusion: "success",
      external_id: externalId,
      ...request.detailsUrl === void 0 ? {} : { details_url: request.detailsUrl },
      output: {
        title: `Completed by ${request.completedBy}`,
        summary: `Manual step \`${request.step}\` was completed by ${request.completedBy}.`
      }
    }
  });
  if (!response.ok) return response;
  return ok({
    id: pending.value.id,
    name: stepCheckName(request.step),
    headSha: request.headSha,
    conclusion: "success",
    externalId
  });
}
async function findStepCompletionRuns(client, request) {
  const origins = [];
  for (const step of request.steps) {
    const completed = await matchingStepCheck(
      client,
      request.repository,
      request.headSha,
      step,
      (identity, check) => identity.planIdentity === request.planIdentity && identity.completionWorkflowRunId !== null && check["conclusion"] === "success"
    );
    if (!completed.ok) return completed;
    const workflowRunId = completed.value.identity.completionWorkflowRunId;
    if (workflowRunId === null) {
      return err(docketError(ErrorCode.stepIncomplete, `manual step \`${step}\` is not completed`));
    }
    origins.push({ step, workflowRunId });
  }
  return ok(origins);
}
function stepCheckName(step) {
  return `docket/step/${step}`;
}
async function findOriginatingRun(client, repository2, headSha) {
  const response = await githubRequest(client, {
    method: "GET",
    path: `/repos/${repository2}/commits/${headSha}/check-runs?check_name=${encodeURIComponent(VALIDATION_CHECK_NAME)}&filter=latest&per_page=100`
  });
  if (!response.ok) return response;
  const raw = asRecord(response.value.body)?.["check_runs"];
  const checks = (Array.isArray(raw) ? raw : []).flatMap((entry) => {
    const check = asRecord(entry);
    return check === void 0 ? [] : [check];
  });
  if (checks.length === 0) {
    return err(
      docketError(
        ErrorCode.validationNotPassed,
        `no ${VALIDATION_CHECK_NAME} check exists for ${headSha}`
      )
    );
  }
  const ours = checks.filter((check) => decodeExternalId(text(check["external_id"])) !== void 0);
  if (ours.length === 0) {
    const failed = checks.find((check) => text(check["conclusion"]) !== "success");
    return err(
      failed === void 0 ? docketError(
        ErrorCode.githubFailed,
        `no ${VALIDATION_CHECK_NAME} check for ${headSha} names its workflow run`
      ) : docketError(
        ErrorCode.validationNotPassed,
        `the ${VALIDATION_CHECK_NAME} check for ${headSha} concluded ${text(failed["conclusion"]) ?? "nothing"}`
      )
    );
  }
  const passed = ours.find((check) => text(check["conclusion"]) === "success");
  if (passed === void 0) {
    return err(
      docketError(
        ErrorCode.validationNotPassed,
        `the ${VALIDATION_CHECK_NAME} check for ${headSha} concluded ${text(ours[0]?.["conclusion"]) ?? "nothing"}`
      )
    );
  }
  const decoded = decodeExternalId(text(passed["external_id"]));
  if (decoded === void 0) {
    return err(
      docketError(
        ErrorCode.githubFailed,
        `the ${VALIDATION_CHECK_NAME} check for ${headSha} does not name its workflow run`
      )
    );
  }
  return ok(decoded);
}
function encodeExternalId(workflowRunId, planIdentity2) {
  return JSON.stringify({ workflowRunId, planIdentity: planIdentity2 });
}
function decodeExternalId(value) {
  if (value === void 0) return void 0;
  try {
    const parsed = asRecord(JSON.parse(value));
    const workflowRunId = text(parsed?.["workflowRunId"]);
    const planIdentity2 = text(parsed?.["planIdentity"]);
    return workflowRunId === void 0 || !/^[1-9][0-9]*$/.test(workflowRunId) || planIdentity2 === void 0 || !/^sha256:[0-9a-f]{64}$/.test(planIdentity2) ? void 0 : { workflowRunId, planIdentity: planIdentity2 };
  } catch {
    return void 0;
  }
}
async function matchingStepCheck(client, repository2, headSha, step, predicate) {
  const response = await githubRequest(client, {
    method: "GET",
    path: `/repos/${repository2}/commits/${headSha}/check-runs?check_name=${encodeURIComponent(stepCheckName(step))}&filter=latest&per_page=100`
  });
  if (!response.ok) return response;
  const checks = asRecord(response.value.body)?.["check_runs"];
  for (const raw of Array.isArray(checks) ? checks : []) {
    const check = asRecord(raw);
    const id = typeof check?.["id"] === "number" ? check["id"] : void 0;
    const identity = decodeStepCheck(text(check?.["external_id"]));
    if (id !== void 0 && identity?.step === step && predicate(identity, check ?? {})) {
      return ok({ id, identity });
    }
  }
  return err(
    docketError(
      ErrorCode.stepIncomplete,
      `no matching ${stepCheckName(step)} check exists for ${headSha}`
    )
  );
}
function encodeStepCheck(identity) {
  return JSON.stringify({
    v: 1,
    s: identity.step,
    p: identity.planIdentity,
    vr: identity.validationWorkflowRunId,
    cr: identity.completionWorkflowRunId
  });
}
function decodeStepCheck(value) {
  if (value === void 0) return void 0;
  try {
    const record = asRecord(JSON.parse(value));
    if (record?.["v"] !== 1 || text(record["s"]) === void 0 || text(record["p"]) === void 0 || text(record["vr"]) === void 0 || !(record["cr"] === null || text(record["cr"]))) {
      return void 0;
    }
    return {
      schema: STEP_CHECK_SCHEMA,
      step: record["s"],
      planIdentity: record["p"],
      validationWorkflowRunId: record["vr"],
      completionWorkflowRunId: record["cr"]
    };
  } catch {
    return void 0;
  }
}
function asRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function text(value) {
  return typeof value === "string" && value !== "" ? value : void 0;
}

// src/lib/features/run/read-artifacts.ts
import { readFile } from "node:fs/promises";
import { join as join2 } from "node:path";

// src/lib/shared/json/canonical-json.ts
import { createHash } from "node:crypto";
function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}
function canonicalJsonFile(value) {
  return `${JSON.stringify(canonicalize(value), null, "	")}
`;
}
function digestOf(content) {
  return `sha256:${createHash("sha256").update(content, "utf8").digest("hex")}`;
}
function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== "object") return value;
  const entries = Object.entries(value).filter(([, item]) => item !== void 0).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
  return Object.fromEntries(entries.map(([key, item]) => [key, canonicalize(item)]));
}

// src/lib/features/metadata/metadata-component.ts
var MetadataType = {
  apexClass: "ApexClass"
};
function componentKey(component) {
  return `${component.type}:${component.member}`;
}
function compareComponents(a, b) {
  if (a.type !== b.type) return a.type < b.type ? -1 : 1;
  if (a.member === b.member) return 0;
  return a.member < b.member ? -1 : 1;
}

// src/lib/features/metadata/classify-path.ts
var DEFAULT_SOURCE_ROOT = "force-app";
function classifyPath(path, options = { sourceRoot: DEFAULT_SOURCE_ROOT }) {
  const root = trimSlashes(options.sourceRoot);
  if (root !== "" && !path.startsWith(`${root}/`)) return ok({ kind: "ignored" });
  const segments = path.split("/");
  const fileName = segments.at(-1);
  if (fileName === void 0 || fileName === "") {
    return err(unsupported(path, "it does not name a file"));
  }
  const member = apexClassMember(fileName);
  if (member === void 0) {
    return err(unsupported(path, "only ApexClass is implemented"));
  }
  if (segments.at(-2) !== "classes") {
    return err(unsupported(path, "an Apex class must live in a `classes` directory"));
  }
  if (!APEX_IDENTIFIER.test(member)) {
    return err(unsupported(path, `\`${member}\` is not a valid Apex class name`));
  }
  return ok({ kind: "component", component: { type: MetadataType.apexClass, member } });
}
var APEX_IDENTIFIER = /^[A-Za-z][A-Za-z0-9_]*$/;
var APEX_SUFFIXES = [".cls-meta.xml", ".cls"];
function apexClassMember(fileName) {
  for (const suffix of APEX_SUFFIXES) {
    if (fileName.endsWith(suffix)) return fileName.slice(0, -suffix.length);
  }
  return void 0;
}
function trimSlashes(value) {
  return value.replace(/^\/+|\/+$/g, "");
}
function unsupported(path, reason) {
  return docketError(ErrorCode.unsupportedMetadata, `cannot map \`${path}\`: ${reason}`);
}

// src/lib/features/metadata/component-set.ts
function collectComponents(changes, options = { sourceRoot: DEFAULT_SOURCE_ROOT }) {
  const deployable = /* @__PURE__ */ new Map();
  const destructive = /* @__PURE__ */ new Map();
  for (const change of changes) {
    const classified = classifyPath(change.path, options);
    if (!classified.ok) return classified;
    if (classified.value.kind === "component") {
      const component = classified.value.component;
      const target = change.status === "deleted" ? destructive : deployable;
      const applied = change.status === "renamed" ? "added" : change.status;
      target.set(componentKey(component), merge(target.get(componentKey(component)), component, applied));
    }
    if (change.status !== "renamed") continue;
    const previous = classifyPath(change.previousPath, options);
    if (!previous.ok) return previous;
    if (previous.value.kind === "component") {
      const component = previous.value.component;
      destructive.set(componentKey(component), merge(destructive.get(componentKey(component)), component, "deleted"));
    }
  }
  for (const [key, component] of deployable) {
    if (!destructive.delete(key)) continue;
    deployable.set(key, { ...component, change: "modified" });
  }
  return ok({ deployable: sorted(deployable), destructive: sorted(destructive) });
}
function merge(existing, component, change) {
  if (existing === void 0) return { ...component, change };
  return existing.change === change ? existing : { ...component, change: "modified" };
}
function sorted(components) {
  return [...components.values()].sort(compareComponents);
}

// src/lib/features/metadata/package-xml.ts
var DEFAULT_API_VERSION = "62.0";
var INDENT = "    ";
function renderPackageXml(components, apiVersion = DEFAULT_API_VERSION) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', PACKAGE_OPEN];
  for (const [type, members] of groupByType(components)) {
    lines.push(`${INDENT}<types>`);
    for (const member of members) lines.push(`${INDENT}${INDENT}<members>${escape(member)}</members>`);
    lines.push(`${INDENT}${INDENT}<name>${escape(type)}</name>`, `${INDENT}</types>`);
  }
  lines.push(`${INDENT}<version>${escape(apiVersion)}</version>`, "</Package>", "");
  return lines.join("\n");
}
var PACKAGE_OPEN = '<Package xmlns="http://soap.sforce.com/2006/04/metadata">';
function groupByType(components) {
  const grouped = /* @__PURE__ */ new Map();
  for (const component of [...components].sort(compareComponents)) {
    const members = grouped.get(component.type) ?? [];
    members.push(component.member);
    grouped.set(component.type, members);
  }
  return grouped;
}
function escape(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

// src/lib/features/plan/deployment-plan.ts
var PLAN_SCHEMA = "docket.plan/v1";
function planChangesMetadata(plan) {
  return plan.components.deployable.length > 0 || plan.components.destructive.length > 0;
}

// src/lib/features/plan/report.ts
function renderReport(plan) {
  const { source, target } = plan;
  return [
    `# Deployment plan \u2014 ${target.environmentId}`,
    "",
    "| Field | Value |",
    "| --- | --- |",
    `| Repository | ${source.repository} |`,
    `| Pull request | #${source.pullRequest} |`,
    `| Base commit | \`${source.baseSha}\` |`,
    `| Head commit | \`${source.headSha}\` |`,
    `| Salesforce org | ${target.org} (${target.orgId}) |`,
    `| Destructive changes | ${plan.allowDestructiveChanges ? "allowed" : "not allowed"} |`,
    `| Apex tests | ${describeTests(plan.tests)} |`,
    `| API version | ${plan.apiVersion} |`,
    `| Plan identity | \`${plan.identity}\` |`,
    "",
    ...section("Deploy", plan.components.deployable, "Nothing is deployed."),
    ...section("Delete", plan.components.destructive, "Nothing is deleted."),
    ...steps(plan)
  ].join("\n");
}
function steps(plan) {
  const rows = [
    ...plan.steps.gates.map((gate) => `| gate | ${gate.name} | \`${gate.run}\` |`),
    ...plan.steps.preDeployment.map((step) => `| pre | ${step.name} | ${describeStep(step)} |`),
    ...plan.steps.postDeployment.map((step) => `| post | ${step.name} | ${describeStep(step)} |`)
  ];
  if (rows.length === 0) return ["## Steps", "", "No gates or deployment steps are configured.", ""];
  return ["## Steps", "", "| When | Name | What |", "| --- | --- | --- |", ...rows, ""];
}
function describeStep(step) {
  return step.kind === "manual" ? `manual \u2014 ${step.instructions}` : `\`${step.run}\``;
}
function section(title, components, empty) {
  if (components.length === 0) return [`## ${title}`, "", empty, ""];
  return [
    `## ${title} (${components.length})`,
    "",
    "| Type | Member | Change |",
    "| --- | --- | --- |",
    ...components.map(
      (component) => `| ${component.type} | ${component.member} | ${component.change} |`
    ),
    ""
  ];
}
function describeTests(tests) {
  return tests.mode === "all" ? "all local tests" : tests.classes.join(", ");
}

// src/lib/features/plan/build-plan.ts
function buildPlan(request) {
  const components = collectComponents(request.changes, { sourceRoot: request.sourceRoot });
  if (!components.ok) return components;
  const policy = enforceDeletionPolicy(components.value, request.environment);
  if (!policy.ok) return policy;
  const packageXml = renderPackageXml(components.value.deployable, request.apiVersion);
  const destructiveChangesXml = components.value.destructive.length === 0 ? void 0 : renderPackageXml(components.value.destructive, request.apiVersion);
  const manifestDigests = {
    packageXml: digestOf(packageXml),
    destructiveChangesXml: destructiveChangesXml === void 0 ? null : digestOf(destructiveChangesXml)
  };
  const target = {
    environmentId: request.environment.id,
    org: request.environment.org,
    orgId: request.orgId
  };
  const plan = {
    schema: PLAN_SCHEMA,
    source: request.source,
    target,
    tests: request.environment.tests,
    allowDestructiveChanges: request.environment.allowDestructiveChanges,
    apiVersion: request.apiVersion,
    components: components.value,
    steps: {
      gates: request.environment.gates,
      preDeployment: request.environment.preDeployment,
      postDeployment: request.environment.postDeployment
    },
    manifestDigests,
    identity: planIdentity({
      source: request.source,
      orgId: request.orgId,
      tests: request.environment.tests,
      allowDestructiveChanges: request.environment.allowDestructiveChanges,
      manifestDigests
    })
  };
  return ok({
    plan,
    packageXml,
    destructiveChangesXml,
    report: renderReport(plan)
  });
}
function planIdentity(input) {
  return digestOf(
    canonicalJson({
      repository: input.source.repository,
      pullRequest: input.source.pullRequest,
      baseSha: input.source.baseSha,
      headSha: input.source.headSha,
      orgId: input.orgId,
      tests: input.tests,
      allowDestructiveChanges: input.allowDestructiveChanges,
      manifestDigests: input.manifestDigests
    })
  );
}
function enforceDeletionPolicy(components, environment) {
  if (components.destructive.length === 0 || environment.allowDestructiveChanges) {
    return ok(components);
  }
  const names = components.destructive.map((component) => `${component.type}:${component.member}`).join(", ");
  return err(
    docketError(
      ErrorCode.destructiveNotAllowed,
      `environment ${environment.id} forbids destructive changes, but the plan deletes ${names}`
    )
  );
}

// src/lib/features/validation/validation-record.ts
var VALIDATION_SCHEMA = "docket.validation/v1";
function validationRecordOf(input) {
  const failures = [...input.failures ?? []];
  for (const step of input.steps) {
    if (step.status === "failed") failures.push(`step \`${step.name}\` failed`);
  }
  const deployment = input.deployment;
  if (deployment !== null && !deployment.success) {
    failures.push(`Salesforce reported ${deployment.status}`);
    for (const failure of deployment.componentFailures) {
      failures.push(`${failure.type} ${failure.member}: ${failure.problem}`);
    }
    for (const failure of deployment.tests.failures) {
      failures.push(`${failure.className}.${failure.method}: ${failure.message}`);
    }
  }
  const salesforce = input.salesforce ?? "validated";
  if (salesforce === "validated" && deployment === null && failures.length === 0) {
    failures.push("Salesforce validation did not run");
  }
  return {
    schema: VALIDATION_SCHEMA,
    verdict: failures.length === 0 ? "passed" : "failed",
    planIdentity: input.plan.identity,
    org: { reference: input.plan.target.org, id: input.plan.target.orgId },
    tests: input.plan.tests,
    steps: input.steps,
    salesforce,
    deployment,
    failures
  };
}

// src/lib/features/run/write-artifacts.ts
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

// src/lib/features/run/secret-scan.ts
var PATTERNS = [
  { name: "Salesforce session id", pattern: /\b00[DQ][A-Za-z0-9]{12,15}![A-Za-z0-9._-]{10,}/ },
  { name: "Salesforce auth url", pattern: /force:\/\/[^\s"']+/ },
  { name: "private key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/ },
  { name: "GitHub token", pattern: /\b(?:ghp|ghs|gho|ghu|ghr)_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}/ },
  { name: "AWS access key id", pattern: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { name: "bearer token", pattern: /\bBearer\s+[A-Za-z0-9._~+/-]{20,}/ },
  { name: "assigned secret", pattern: /\b(?:client_secret|refresh_token|access_token|password|passwd)\b\s*[:=]\s*["']?\S+/i }
];
function findSecrets(content) {
  const findings = [];
  content.split("\n").forEach((line, index) => {
    for (const { name, pattern } of PATTERNS) {
      if (pattern.test(line)) findings.push({ rule: name, line: index + 1 });
    }
  });
  return findings;
}

// src/lib/features/run/write-artifacts.ts
var ARTIFACT_NAMES = {
  plan: "plan.json",
  packageXml: "package.xml",
  destructiveChangesXml: "destructiveChanges.xml",
  validation: "validation.json",
  deployment: "deployment.json",
  run: "run.json",
  report: "report.md"
};
async function writeRunArtifacts(directory, artifacts) {
  const files = /* @__PURE__ */ new Map([
    [ARTIFACT_NAMES.plan, canonicalJsonFile(artifacts.plan.plan)],
    [ARTIFACT_NAMES.packageXml, artifacts.plan.packageXml],
    [ARTIFACT_NAMES.report, artifacts.plan.report],
    [ARTIFACT_NAMES.run, canonicalJsonFile(artifacts.run)]
  ]);
  if (artifacts.plan.destructiveChangesXml !== void 0) {
    files.set(ARTIFACT_NAMES.destructiveChangesXml, artifacts.plan.destructiveChangesXml);
  }
  if (artifacts.validation !== void 0) {
    files.set(ARTIFACT_NAMES.validation, canonicalJsonFile(artifacts.validation));
  }
  if (artifacts.run.deployment !== null) {
    files.set(ARTIFACT_NAMES.deployment, canonicalJsonFile(artifacts.run.deployment));
  }
  for (const log of artifacts.logs ?? []) files.set(join("logs", log.name), log.contents);
  const leak = firstSecret(files);
  if (leak !== void 0) return err(leak);
  for (const [name, contents] of files) {
    const target = join(directory, name);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, contents, "utf8");
  }
  return ok([...files.keys()].sort());
}
function firstSecret(files) {
  for (const [name, contents] of files) {
    const findings = findSecrets(contents);
    const first = findings[0];
    if (first === void 0) continue;
    return docketError(
      ErrorCode.secretInArtifact,
      `refusing to write ${name}: it contains a ${first.rule} on line ${first.line}`
    );
  }
  return void 0;
}

// src/lib/features/run/run-record.ts
var RUN_SCHEMA = "docket.run/v1";

// src/lib/features/salesforce/org-id.ts
var SALESFORCE_ORG_ID = /^00D[A-Za-z0-9]{12}(?:[A-Za-z0-9]{3})?$/;
function isSalesforceOrgId(value) {
  return typeof value === "string" && SALESFORCE_ORG_ID.test(value);
}
function parseSalesforceOrgId(value, where, code) {
  return isSalesforceOrgId(value) ? ok(value) : err(docketError(code, `${where} must be a 15- or 18-character Salesforce org id starting with 00D`));
}

// src/lib/features/run/artifact-codecs.ts
var SHA = /^[0-9a-f]{40}$/;
var DIGEST = /^sha256:[0-9a-f]{64}$/;
function isDeploymentPlan(value) {
  const plan = asRecord2(value);
  const source = asRecord2(plan?.["source"]);
  const target = asRecord2(plan?.["target"]);
  const components = asRecord2(plan?.["components"]);
  const steps2 = asRecord2(plan?.["steps"]);
  const digests = asRecord2(plan?.["manifestDigests"]);
  if (plan?.["schema"] !== PLAN_SCHEMA || !repository(source?.["repository"]) || !positiveInteger(source?.["pullRequest"]) || !matches(source?.["baseSha"], SHA) || !matches(source?.["headSha"], SHA) || !text2(target?.["environmentId"]) || !text2(target?.["org"]) || !isSalesforceOrgId(target?.["orgId"]) || !isTestSelection(plan["tests"]) || typeof plan["allowDestructiveChanges"] !== "boolean" || !text2(plan["apiVersion"]) || !isPlannedComponents(components?.["deployable"], ["added", "modified"]) || !isPlannedComponents(components?.["destructive"], ["deleted"]) || !isGateDefinitions(steps2?.["gates"]) || !isStepDefinitions(steps2?.["preDeployment"], true) || !isStepDefinitions(steps2?.["postDeployment"], false) || !matches(digests?.["packageXml"], DIGEST) || !(digests?.["destructiveChangesXml"] === null || matches(digests?.["destructiveChangesXml"], DIGEST)) || !matches(plan["identity"], DIGEST)) {
    return false;
  }
  return plan["allowDestructiveChanges"] === true || Array.isArray(components["destructive"]) && components["destructive"].length === 0;
}
function isValidationRecord(value) {
  const validation = asRecord2(value);
  const org = asRecord2(validation?.["org"]);
  const deployment = validation?.["deployment"];
  const failures = validation?.["failures"];
  if (validation?.["schema"] !== VALIDATION_SCHEMA || !verdict(validation["verdict"]) || !matches(validation["planIdentity"], DIGEST) || !text2(org?.["reference"]) || !isSalesforceOrgId(org?.["id"]) || !isTestSelection(validation["tests"]) || !isStepResults(validation["steps"]) || !oneOf(validation["salesforce"], ["validated", "not-required"]) || !(deployment === null || isDeploymentOutcome(deployment)) || !stringArray(failures)) {
    return false;
  }
  if (deployment !== null && deployment.checkOnly !== true) return false;
  if (validation["salesforce"] === "not-required" && deployment !== null) return false;
  if (validation["verdict"] === "passed") {
    return failures.length === 0 && (validation["salesforce"] === "not-required" || deployment !== null && deployment.success) && !validation["steps"].some((step) => step.status === "failed");
  }
  return failures.length > 0;
}
function isRunRecord(value) {
  const run = asRecord2(value);
  const timing = asRecord2(run?.["timing"]);
  const validation = run?.["validation"];
  const deployment = run?.["deployment"];
  const workflow = run?.["workflow"];
  const mergeCommit = run?.["mergeCommit"];
  const expires = run?.["artifactsExpireAt"];
  if (run?.["schema"] !== RUN_SCHEMA || !oneOf(run["kind"], ["validate", "deploy", "rollback"]) || !oneOf(run["executor"], ["local", "github-actions"]) || !verdict(run["status"]) || !isoDate(timing?.["startedAt"]) || !isoDate(timing?.["finishedAt"]) || !isDeploymentPlan(run["plan"]) || !(validation === null || isValidationRecord(validation)) || !(deployment === null || isDeploymentOutcome(deployment)) || !isStepResults(run["steps"]) || !(workflow === null || isWorkflow(workflow)) || !(mergeCommit === null || matches(mergeCommit, SHA)) || !(expires === null || isoDate(expires))) {
    return false;
  }
  if (run["executor"] === "local" ? workflow !== null : workflow === null) return false;
  if (validation === null) return false;
  const emptyPlan = run["plan"].components.deployable.length === 0 && run["plan"].components.destructive.length === 0;
  if (emptyPlan !== (validation.salesforce === "not-required")) return false;
  if (run["kind"] === "validate") {
    return run["status"] === validation.verdict && deployment === null && mergeCommit === null && sameJson(run["steps"], validation.steps);
  }
  if (deployment !== null && deployment.checkOnly) return false;
  if (emptyPlan && deployment !== null) return false;
  const failed = !emptyPlan && (deployment === null || !deployment.success) || run["steps"].some((step) => step.status === "failed" || step.status === "pending");
  return run["status"] === (failed ? "failed" : "passed");
}
function isDeploymentOutcome(value) {
  const deployment = asRecord2(value);
  const components = deployment?.["componentFailures"];
  const tests = asRecord2(deployment?.["tests"]);
  const failures = tests?.["failures"];
  if (!text2(deployment?.["deploymentId"]) || !text2(deployment["status"]) || typeof deployment["success"] !== "boolean" || typeof deployment["checkOnly"] !== "boolean" || !Array.isArray(components) || !components.every(isComponentFailure) || !nonNegativeInteger(tests?.["run"]) || !nonNegativeInteger(tests?.["failed"]) || !Array.isArray(failures) || !failures.every(isTestFailure)) {
    return false;
  }
  const succeeded = deployment["status"] === "Succeeded";
  if (deployment["success"] !== succeeded) return false;
  return !succeeded || components.length === 0 && tests["failed"] === 0 && failures.length === 0;
}
function isStepResults(value) {
  return Array.isArray(value) && value.every(isStepResult);
}
function isStepResult(value) {
  const step = asRecord2(value);
  if (!text2(step?.["name"]) || !oneOf(step["kind"], ["gate", "pre", "post"]) || typeof step["manual"] !== "boolean" || !oneOf(step["status"], ["passed", "failed", "skipped", "pending"]) || !(step["exitCode"] === null || integer(step["exitCode"])) || !(step["completedBy"] === null || text2(step["completedBy"]))) {
    return false;
  }
  if (step["kind"] === "gate" && step["manual"]) return false;
  if (step["manual"]) {
    if (step["exitCode"] !== null) return false;
    return step["status"] !== "pending" || step["completedBy"] === null;
  }
  if (step["completedBy"] !== null || step["status"] === "pending") return false;
  return step["status"] === "skipped" ? step["exitCode"] === null : integer(step["exitCode"]);
}
function isGateDefinitions(value) {
  return Array.isArray(value) && value.every((entry) => {
    const gate = asRecord2(entry);
    return text2(gate?.["name"]) && text2(gate["run"]) && positiveNumber(gate["timeoutMinutes"]);
  });
}
function isStepDefinitions(value, manualAllowed) {
  return Array.isArray(value) && value.every((entry) => {
    const step = asRecord2(entry);
    if (!text2(step?.["name"])) return false;
    if (step["kind"] === "automatic") {
      return text2(step["run"]) && positiveNumber(step["timeoutMinutes"]);
    }
    return manualAllowed && step["kind"] === "manual" && text2(step["instructions"]);
  });
}
function isPlannedComponents(value, changes) {
  return Array.isArray(value) && value.every((entry) => {
    const component = asRecord2(entry);
    return component?.["type"] === "ApexClass" && text2(component["member"]) && oneOf(component["change"], changes);
  });
}
function isTestSelection(value) {
  const tests = asRecord2(value);
  if (tests?.["mode"] === "all") return true;
  return tests?.["mode"] === "specified" && Array.isArray(tests["classes"]) && tests["classes"].length > 0 && tests["classes"].every(text2);
}
function isComponentFailure(value) {
  const failure = asRecord2(value);
  return text2(failure?.["type"]) && text2(failure["member"]) && text2(failure["problem"]);
}
function isTestFailure(value) {
  const failure = asRecord2(value);
  return text2(failure?.["className"]) && text2(failure["method"]) && text2(failure["message"]);
}
function isWorkflow(value) {
  const workflow = asRecord2(value);
  return matches(workflow?.["runId"], /^[1-9][0-9]*$/) && positiveInteger(workflow["runAttempt"]);
}
function asRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function text2(value) {
  return typeof value === "string" && value !== "";
}
function repository(value) {
  return typeof value === "string" && /^[^/\s]+\/[^/\s]+$/.test(value);
}
function matches(value, pattern) {
  return typeof value === "string" && pattern.test(value);
}
function verdict(value) {
  return value === "passed" || value === "failed";
}
function integer(value) {
  return typeof value === "number" && Number.isInteger(value);
}
function positiveInteger(value) {
  return integer(value) && value > 0;
}
function nonNegativeInteger(value) {
  return integer(value) && value >= 0;
}
function positiveNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}
function stringArray(value) {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}
function oneOf(value, values) {
  return values.some((candidate) => candidate === value);
}
function isoDate(value) {
  if (typeof value !== "string") return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString() === value;
}
function sameJson(left, right) {
  return canonicalJson(left) === canonicalJson(right);
}

// src/lib/features/run/read-artifacts.ts
async function readValidatedRun(directory) {
  const run = await readValidationRun(directory);
  if (!run.ok) return run;
  if (run.value.validation.verdict !== "passed") {
    return err(
      docketError(
        ErrorCode.validationNotPassed,
        `the recorded validation did not pass: ${run.value.validation.failures.join("; ") || "no reason recorded"}`
      )
    );
  }
  return run;
}
async function readValidationRun(directory) {
  const run = await readRecordedRun(directory);
  if (!run.ok) return run;
  if (run.value.run.kind !== "validate" || run.value.run.status !== run.value.validation.verdict) {
    return err(tampered(`${ARTIFACT_NAMES.run} is not a consistent validation run`));
  }
  return run;
}
async function readRecordedRun(directory) {
  const run = await readJson(directory, ARTIFACT_NAMES.run, RUN_SCHEMA, isRunRecord);
  if (!run.ok) return run;
  const validation = await readJson(
    directory,
    ARTIFACT_NAMES.validation,
    VALIDATION_SCHEMA,
    isValidationRecord
  );
  if (!validation.ok) return validation;
  const planFile = await readJson(directory, ARTIFACT_NAMES.plan, PLAN_SCHEMA, isDeploymentPlan);
  if (!planFile.ok) return planFile;
  const plan = run.value.plan;
  if (run.value.validation === null || canonicalJson(run.value.validation) !== canonicalJson(validation.value)) {
    return err(tampered(`${ARTIFACT_NAMES.run} and ${ARTIFACT_NAMES.validation} disagree`));
  }
  if (canonicalJson(planFile.value) !== canonicalJson(plan)) {
    return err(tampered(`${ARTIFACT_NAMES.plan} and ${ARTIFACT_NAMES.run} disagree`));
  }
  if (validation.value.planIdentity !== plan.identity) {
    return err(tampered("the validation approved a different plan than the one recorded"));
  }
  if (validation.value.org.reference !== plan.target.org || validation.value.org.id !== plan.target.orgId || canonicalJson(validation.value.tests) !== canonicalJson(plan.tests)) {
    return err(tampered("the validation names a different org or test selection than the plan"));
  }
  const recomputed = planIdentity({
    source: plan.source,
    orgId: plan.target.orgId,
    tests: plan.tests,
    allowDestructiveChanges: plan.allowDestructiveChanges,
    manifestDigests: plan.manifestDigests
  });
  if (recomputed !== plan.identity) {
    return err(tampered("the plan does not hash to the identity it carries"));
  }
  const manifests = await verifyManifests(directory, plan);
  if (!manifests.ok) return manifests;
  return ok({
    run: run.value,
    validation: validation.value,
    plan,
    packageXmlPath: manifests.value.packageXmlPath,
    destructiveChangesXmlPath: manifests.value.destructiveChangesXmlPath
  });
}
async function verifyManifests(directory, plan) {
  const packageXmlPath = join2(directory, ARTIFACT_NAMES.packageXml);
  const packageXml = await readFile(packageXmlPath, "utf8").catch(() => void 0);
  if (packageXml === void 0) return err(tampered(`${ARTIFACT_NAMES.packageXml} is missing`));
  if (digestOf(packageXml) !== plan.manifestDigests.packageXml) {
    return err(tampered(`${ARTIFACT_NAMES.packageXml} does not match the validated plan`));
  }
  const expected = plan.manifestDigests.destructiveChangesXml;
  if (expected === null) return ok({ packageXmlPath, destructiveChangesXmlPath: void 0 });
  const destructiveChangesXmlPath = join2(directory, ARTIFACT_NAMES.destructiveChangesXml);
  const destructive = await readFile(destructiveChangesXmlPath, "utf8").catch(() => void 0);
  if (destructive === void 0) {
    return err(tampered(`${ARTIFACT_NAMES.destructiveChangesXml} is missing`));
  }
  if (digestOf(destructive) !== expected) {
    return err(tampered(`${ARTIFACT_NAMES.destructiveChangesXml} does not match the validated plan`));
  }
  return ok({ packageXmlPath, destructiveChangesXmlPath });
}
async function readJson(directory, name, schema, decode) {
  const contents = await readFile(join2(directory, name), "utf8").catch(() => void 0);
  if (contents === void 0) return err(tampered(`${name} is missing`));
  let parsed;
  try {
    parsed = JSON.parse(contents);
  } catch {
    return err(tampered(`${name} is not readable JSON`));
  }
  if (!decode(parsed)) {
    return err(tampered(`${name} is not a valid ${schema} document`));
  }
  return ok(parsed);
}
function tampered(problem) {
  return docketError(ErrorCode.planMismatch, `refusing to deploy: ${problem}`);
}

// src/lib/features/steps/step-completion.ts
import { mkdir as mkdir2, readdir, readFile as readFile2, writeFile as writeFile2 } from "node:fs/promises";
import { join as join3 } from "node:path";
var STEP_COMPLETION_SCHEMA = "docket.step-completion/v1";
async function recordCompletion(directory, completion) {
  await mkdir2(directory, { recursive: true });
  const valid = parseCompletion(completion, fileNameOf(completion));
  if (!valid.ok) return valid;
  const path = completionPath(directory, completion);
  try {
    await writeFile2(path, canonicalJsonFile(completion), { encoding: "utf8", flag: "wx" });
  } catch (error) {
    if (!hasCode(error, "EEXIST")) throw error;
    return err(
      docketError(
        ErrorCode.stepAlreadyCompleted,
        `step \`${completion.step}\` is already recorded as completed`
      )
    );
  }
  return ok(path);
}
function completionPath(directory, completion) {
  return join3(directory, fileNameOf(completion));
}
async function readCompletions(directory) {
  const names = await readdir(directory).catch(() => void 0);
  if (names === void 0) return ok([]);
  const completions = [];
  for (const name of names.sort()) {
    if (!name.endsWith(".json")) continue;
    const contents = await readFile2(join3(directory, name), "utf8").catch(() => void 0);
    if (contents === void 0) {
      return err(docketError(ErrorCode.stepIncomplete, `step completion \`${name}\` cannot be read`));
    }
    try {
      const parsed = parseCompletion(JSON.parse(contents), name);
      if (!parsed.ok) return parsed;
      completions.push(parsed.value);
    } catch {
      return err(
        docketError(ErrorCode.stepIncomplete, `step completion \`${name}\` is not readable JSON`)
      );
    }
  }
  return ok(completions);
}
function completedSteps(completions, planIdentity2, headSha) {
  return new Map(
    completions.filter(
      (completion) => completion.planIdentity === planIdentity2 && completion.headSha === headSha
    ).map((completion) => [completion.step, completion])
  );
}
function fileNameOf(completion) {
  return `${completion.planIdentity.replace(":", "_")}--${completion.step}.json`;
}
function parseCompletion(value, name) {
  const record = asRecord3(value);
  const workflowRunId = record?.["workflowRunId"];
  if (record?.["schema"] !== STEP_COMPLETION_SCHEMA || !text3(record["step"], /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/) || !text3(record["planIdentity"], /^sha256:[0-9a-f]{64}$/) || !text3(record["headSha"], /^[0-9a-f]{40}$/) || !text3(record["completedBy"], /^\S(?:.*\S)?$/) || !isoDate2(record["completedAt"]) || !(workflowRunId === null || text3(workflowRunId, /^[1-9][0-9]*$/))) {
    return err(
      docketError(ErrorCode.stepIncomplete, `step completion \`${name}\` has an invalid shape`)
    );
  }
  const completion = {
    schema: STEP_COMPLETION_SCHEMA,
    step: record["step"],
    planIdentity: record["planIdentity"],
    headSha: record["headSha"],
    completedBy: record["completedBy"],
    completedAt: record["completedAt"],
    workflowRunId
  };
  if (fileNameOf(completion) !== name) {
    return err(
      docketError(ErrorCode.stepIncomplete, `step completion \`${name}\` does not match its contents`)
    );
  }
  return ok(completion);
}
function asRecord3(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function text3(value, pattern) {
  return typeof value === "string" && pattern.test(value);
}
function isoDate2(value) {
  if (typeof value !== "string") return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString() === value;
}
function hasCode(error, code) {
  return typeof error === "object" && error !== null && "code" in error && error.code === code;
}

// src/lib/features/cli/commands/paths.ts
import { isAbsolute, join as join4 } from "node:path";
function absolutePath(path, cwd) {
  return isAbsolute(path) ? path : join4(cwd, path);
}

// src/lib/features/cli/commands/pipeline-options.ts
import { isAbsolute as isAbsolute2, join as join5 } from "node:path";

// src/lib/features/github/pull-request.ts
async function readPullRequest(client, repository2, number) {
  const response = await githubRequest(client, {
    method: "GET",
    path: `/repos/${repository2}/pulls/${number}`
  });
  if (!response.ok) return response;
  const body = asRecord4(response.value.body);
  if (body === void 0) {
    return err(docketError(ErrorCode.githubFailed, `pull request ${number} came back unreadable`));
  }
  const base = asRecord4(body["base"]);
  const head = asRecord4(body["head"]);
  const baseSha = parseCommitSha(base?.["sha"], `pull request ${number} base SHA`, ErrorCode.githubFailed);
  const headSha = parseCommitSha(head?.["sha"], `pull request ${number} head SHA`, ErrorCode.githubFailed);
  const baseBranch = text4(base?.["ref"]);
  if (!baseSha.ok || !headSha.ok || baseBranch === void 0) {
    return err(
      docketError(ErrorCode.githubFailed, `pull request ${number} has no base or head to read`)
    );
  }
  let mergeCommitSha = null;
  if (body["merge_commit_sha"] !== null && body["merge_commit_sha"] !== void 0) {
    const parsed = parseCommitSha(
      body["merge_commit_sha"],
      `pull request ${number} merge commit SHA`,
      ErrorCode.githubFailed
    );
    if (!parsed.ok) return parsed;
    mergeCommitSha = parsed.value;
  }
  return ok({
    repository: repository2,
    number,
    state: text4(body["state"]) ?? "unknown",
    draft: body["draft"] === true,
    merged: body["merged"] === true,
    baseBranch,
    baseSha: baseSha.value,
    headSha: headSha.value,
    headRepository: text4(asRecord4(head?.["repo"])?.["full_name"]) ?? "",
    mergeCommitSha
  });
}
function requireValidatablePullRequest(pullRequest) {
  if (pullRequest.headRepository !== pullRequest.repository) {
    return err(
      ineligible(
        pullRequest,
        `its head is in ${pullRequest.headRepository || "another repository"}, and only same-repository pull requests are supported`
      )
    );
  }
  if (pullRequest.draft) return err(ineligible(pullRequest, "it is a draft"));
  if (pullRequest.state !== "open") {
    return err(ineligible(pullRequest, `it is ${pullRequest.state}`));
  }
  return ok(pullRequest);
}
function requireMergedPullRequest(pullRequest) {
  if (pullRequest.headRepository !== pullRequest.repository) {
    return err(ineligible(pullRequest, "its head is in another repository"));
  }
  if (!pullRequest.merged) {
    return err(ineligible(pullRequest, `it is ${pullRequest.state} and was not merged`));
  }
  if (pullRequest.mergeCommitSha === null) {
    return err(ineligible(pullRequest, "GitHub reports no merge commit for it"));
  }
  return ok(pullRequest);
}
function ineligible(pullRequest, reason) {
  return docketError(
    ErrorCode.pullRequestNotEligible,
    `pull request #${pullRequest.number} cannot be used: ${reason}`
  );
}
function asRecord4(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function text4(value) {
  return typeof value === "string" && value !== "" ? value : void 0;
}

// src/lib/features/salesforce/sf-cli.ts
var DEFAULT_SF_EXECUTABLE = "sf";
var ISOLATED_SF_ENV = {
  SF_AUTOUPDATE_DISABLE: "true",
  SF_SKIP_NEW_VERSION_CHECK: "true",
  SF_DISABLE_TELEMETRY: "true",
  SF_USE_PROGRESS_BAR: "false",
  NO_COLOR: "1"
};
async function runSf(cli, args) {
  const result = await runProcess(cli.executable, [...args, "--json"], {
    cwd: cli.cwd,
    env: ISOLATED_SF_ENV,
    ...cli.timeoutMs === void 0 ? {} : { timeoutMs: cli.timeoutMs },
    ...cli.signal === void 0 ? {} : { signal: cli.signal }
  });
  if (result.startError !== null) {
    return err(
      docketError(
        ErrorCode.salesforceFailed,
        `sf ${args.join(" ")} could not start: ${result.startError}`
      )
    );
  }
  if (result.terminatedBy !== null) {
    return err(
      docketError(ErrorCode.salesforceFailed, terminationMessage(args, result.terminatedBy))
    );
  }
  const parsed = parseEnvelope(result.stdout);
  if (parsed === void 0) {
    const detail = firstLine2(result.stderr) || firstLine2(result.stdout) || "no output";
    return err(
      docketError(
        ErrorCode.salesforceFailed,
        `sf ${args.join(" ")} produced no JSON (exit ${result.exitCode}): ${detail}`
      )
    );
  }
  return ok({ ...parsed, exitCode: result.exitCode });
}
function terminationMessage(args, reason) {
  const cause = reason === "timeout" ? "timed out" : "was cancelled";
  return `sf ${args.join(" ")} ${cause}; Salesforce may still be processing the request`;
}
function parseEnvelope(stdout) {
  const document = extractJson(stdout);
  if (document === void 0) return void 0;
  const status = typeof document["status"] === "number" ? document["status"] : void 0;
  if (status === void 0) return void 0;
  return {
    status,
    result: document["result"],
    message: typeof document["message"] === "string" ? document["message"] : void 0,
    name: typeof document["name"] === "string" ? document["name"] : void 0
  };
}
function extractJson(stdout) {
  const start = stdout.indexOf("{");
  const end = stdout.lastIndexOf("}");
  if (start === -1 || end < start) return void 0;
  try {
    const parsed = JSON.parse(stdout.slice(start, end + 1));
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : void 0;
  } catch {
    return void 0;
  }
}
function firstLine2(value) {
  return value.trim().split("\n")[0] ?? "";
}

// src/lib/features/salesforce/org.ts
async function resolveOrg(cli, reference) {
  const envelope = await runSf(cli, ["org", "display", "--target-org", reference]);
  if (!envelope.ok) return envelope;
  const result = envelope.value.result;
  const org = typeof result === "object" && result !== null && !Array.isArray(result) ? result : void 0;
  if (org === void 0 || envelope.value.status !== 0) {
    const detail = envelope.value.message ?? "the CLI reported no org";
    return err(docketError(ErrorCode.orgUnavailable, `cannot use org \`${reference}\`: ${detail}`));
  }
  const id = parseSalesforceOrgId(org["id"], `org \`${reference}\` id`, ErrorCode.orgUnavailable);
  const username = string(org["username"]);
  if (!id.ok || username === void 0) {
    return err(
      docketError(ErrorCode.orgUnavailable, `org \`${reference}\` reported no id or username`)
    );
  }
  const connected = string(org["connectedStatus"]);
  if (connected !== void 0 && connected !== "Connected") {
    return err(
      docketError(ErrorCode.orgUnavailable, `org \`${reference}\` is not connected: ${connected}`)
    );
  }
  return ok({ reference, id: id.value, username, instanceUrl: string(org["instanceUrl"]) ?? "" });
}
function requireOrgId(org, expectedId) {
  if (org.id === expectedId) return ok(org);
  return err(
    docketError(
      ErrorCode.orgMismatch,
      `org \`${org.reference}\` is ${org.id}, but the plan was validated against ${expectedId}`
    )
  );
}
function string(value) {
  return typeof value === "string" && value !== "" ? value : void 0;
}

// src/lib/features/cli/commands/pipeline-options.ts
var DEFAULT_WAIT_MINUTES = 33;
var GRACE_MINUTES = 5;
async function resolveSource(options, context, eligibility = "validatable") {
  if (options.base !== void 0 && options.head !== void 0) {
    const source = planSourceOf(options);
    return source.ok ? ok({ source: source.value, targetBranch: options["target-branch"], pullRequest: void 0 }) : source;
  }
  const repository2 = requiredOption(options.repository, "--repository");
  if (!repository2.ok) return repository2;
  const number = requiredNumber(options["pull-request"], "--pull-request");
  if (!number.ok) return number;
  const client = githubClientOf(options, context);
  if (!client.ok) return client;
  const pullRequest = await readPullRequest(client.value, repository2.value, number.value);
  if (!pullRequest.ok) return pullRequest;
  const eligible = eligibility === "merged" ? requireMergedPullRequest(pullRequest.value) : requireValidatablePullRequest(pullRequest.value);
  if (!eligible.ok) return eligible;
  return ok({
    source: {
      repository: repository2.value,
      pullRequest: number.value,
      baseSha: eligible.value.baseSha,
      headSha: eligible.value.headSha
    },
    targetBranch: eligible.value.baseBranch,
    pullRequest: eligible.value
  });
}
function githubClientOf(options, context) {
  const token = options["github-token"] ?? context.env["GITHUB_TOKEN"] ?? context.env["GH_TOKEN"];
  if (token === void 0 || token === "") {
    return err(
      docketError(
        ErrorCode.missingOption,
        "GitHub is needed here but no token was found: set GITHUB_TOKEN, or pass --base and --head"
      )
    );
  }
  return ok({
    token,
    ...context.githubBaseUrl === void 0 ? {} : { baseUrl: context.githubBaseUrl },
    ...context.fetch === void 0 ? {} : { fetch: context.fetch }
  });
}
function planSourceOf(options) {
  const repository2 = requiredOption(options.repository, "--repository");
  if (!repository2.ok) return repository2;
  const pullRequest = requiredNumber(options["pull-request"], "--pull-request");
  if (!pullRequest.ok) return pullRequest;
  const base = requiredOption(options.base, "--base");
  if (!base.ok) return base;
  const baseSha = parseCommitSha(base.value, "--base", ErrorCode.invalidOption);
  if (!baseSha.ok) return baseSha;
  const head = requiredOption(options.head, "--head");
  if (!head.ok) return head;
  const headSha = parseCommitSha(head.value, "--head", ErrorCode.invalidOption);
  if (!headSha.ok) return headSha;
  return ok({
    repository: repository2.value,
    pullRequest: pullRequest.value,
    baseSha: baseSha.value,
    headSha: headSha.value
  });
}
function orgResolverOf(options, cwd) {
  const explicit = options["org-id"];
  if (explicit !== void 0 && explicit !== "") {
    return async () => parseSalesforceOrgId(explicit, "--org-id", ErrorCode.invalidOption);
  }
  return async (reference) => {
    const org = await resolveOrg({ executable: sfExecutableOf(options), cwd }, reference);
    return org.ok ? ok(org.value.id) : org;
  };
}
function sfExecutableOf(options) {
  return options.sf ?? DEFAULT_SF_EXECUTABLE;
}
function waitMinutesOf(options) {
  if (options.wait === void 0) return ok(DEFAULT_WAIT_MINUTES);
  return requiredNumber(options.wait, "--wait");
}
function executionOf(options) {
  const runId = options["workflow-run-id"];
  const attempt = options["workflow-run-attempt"];
  if (runId === void 0 && attempt === void 0) return ok({ executor: "local" });
  const presentRunId = requiredOption(runId, "--workflow-run-id");
  if (!presentRunId.ok) return presentRunId;
  if (!/^[1-9][0-9]*$/.test(presentRunId.value)) {
    return err(docketError(ErrorCode.invalidOption, "--workflow-run-id must be a positive whole number"));
  }
  const runAttempt = requiredNumber(attempt, "--workflow-run-attempt");
  if (!runAttempt.ok) return runAttempt;
  return ok({
    executor: "github-actions",
    workflow: { runId: presentRunId.value, runAttempt: runAttempt.value }
  });
}
function expectedPlanIdentityOf(options) {
  const identity = options["expected-plan-identity"];
  if (identity === void 0) return ok(void 0);
  if (!/^sha256:[0-9a-f]{64}$/.test(identity)) {
    return err(
      docketError(
        ErrorCode.invalidOption,
        "--expected-plan-identity must be a sha256 digest from docket locate-run"
      )
    );
  }
  return ok(identity);
}
function artifactsExpireAtOf(options) {
  const value = options["artifacts-expire-at"];
  if (value === void 0) return ok(void 0);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString() !== value) {
    return err(
      docketError(
        ErrorCode.invalidOption,
        "--artifacts-expire-at must be an exact ISO-8601 instant, e.g. 2026-11-14T00:00:00.000Z"
      )
    );
  }
  return ok(value);
}
function timeoutMsOf(waitMinutes) {
  return (waitMinutes + GRACE_MINUTES) * 6e4;
}
function outputDirectoryOf(options, cwd, fallback) {
  const out = options.out ?? join5(".docket", fallback);
  return isAbsolute2(out) ? out : join5(cwd, out);
}
function repositoryDirectoryOf(options, cwd) {
  return options.repo ?? cwd;
}
function requiredNumber(value, flag) {
  const present = requiredOption(value, flag);
  if (!present.ok) return present;
  const parsed = Number(present.value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return err(docketError(ErrorCode.invalidOption, `${flag} must be a positive whole number`));
  }
  return ok(parsed);
}

// src/lib/features/cli/commands/complete-step/complete-step-command.ts
var flags2 = flagsFor(
  "validated-run",
  "step",
  "by",
  "steps",
  "repository",
  "workflow-run-id",
  "details-url",
  "github-token"
);
var completeStepCommand = defineCommand({
  name: "complete-step",
  summary: "Record that a manual pre-deployment step was carried out",
  flags: flags2,
  run: async (options, context) => {
    const directory = requiredOption(options["validated-run"], "--validated-run");
    if (!directory.ok) return directory;
    const step = requiredOption(options.step, "--step");
    if (!step.ok) return step;
    const by = requiredOption(options.by, "--by");
    if (!by.ok) return by;
    const steps2 = requiredOption(options.steps, "--steps");
    if (!steps2.ok) return steps2;
    const completionWorkflowRunId = options["workflow-run-id"] ?? null;
    if (completionWorkflowRunId !== null && !/^[1-9][0-9]*$/.test(completionWorkflowRunId)) {
      return err(
        docketError(ErrorCode.invalidOption, "--workflow-run-id must be a positive whole number")
      );
    }
    let publishing;
    if (options.repository !== void 0) {
      const workflowRunId = requiredOption(
        completionWorkflowRunId ?? void 0,
        "--workflow-run-id"
      );
      if (!workflowRunId.ok) return workflowRunId;
      const client = githubClientOf(options, context);
      if (!client.ok) return client;
      publishing = { repository: options.repository, workflowRunId: workflowRunId.value, client: client.value };
    }
    const validated = await readValidatedRun(absolutePath(directory.value, context.cwd));
    if (!validated.ok) return validated;
    const plan = validated.value.plan;
    const known = plan.steps.preDeployment.some(
      (candidate) => candidate.kind === "manual" && candidate.name === step.value
    );
    if (!known) {
      return err(
        docketError(
          ErrorCode.stepIncomplete,
          `this plan has no manual pre-deployment step named \`${step.value}\``
        )
      );
    }
    let completion = {
      schema: STEP_COMPLETION_SCHEMA,
      step: step.value,
      planIdentity: plan.identity,
      headSha: plan.source.headSha,
      completedBy: by.value,
      completedAt: context.now().toISOString(),
      workflowRunId: completionWorkflowRunId
    };
    const stepsDirectory = absolutePath(steps2.value, context.cwd);
    let recorded = await recordCompletion(stepsDirectory, completion);
    if (!recorded.ok && recorded.error.code === ErrorCode.stepAlreadyCompleted && options.repository !== void 0) {
      const existing = await readCompletions(stepsDirectory);
      if (!existing.ok) return existing;
      const same = existing.value.find(
        (candidate) => candidate.step === completion.step && candidate.planIdentity === completion.planIdentity && candidate.headSha === completion.headSha && candidate.completedBy === completion.completedBy && candidate.workflowRunId === completion.workflowRunId
      );
      if (same !== void 0) {
        completion = same;
        recorded = ok(completionPath(stepsDirectory, same));
      }
    }
    if (!recorded.ok) return recorded;
    if (publishing !== void 0) {
      const published = await completeStepCheck(publishing.client, {
        repository: publishing.repository,
        headSha: plan.source.headSha,
        step: step.value,
        planIdentity: plan.identity,
        completionWorkflowRunId: publishing.workflowRunId,
        completedBy: by.value,
        ...options["details-url"] === void 0 ? {} : { detailsUrl: options["details-url"] }
      });
      if (!published.ok) return published;
    }
    return ok({ kind: "step-completed", completion, path: recorded.value });
  }
});

// src/lib/features/cli/commands/deploy/deploy-command.ts
import { isAbsolute as isAbsolute3, join as join7 } from "node:path";

// src/lib/features/pipeline/deploy-run.ts
import { readFile as readFile3 } from "node:fs/promises";

// src/lib/features/config/docket-config.ts
var CONFIG_FILE_NAME = "docket.yml";
var DEFAULT_STEP_TIMEOUT_MINUTES = 10;

// src/lib/features/config/parse-config.ts
var import_yaml = __toESM(require_dist(), 1);
function parseConfig(text7) {
  let raw;
  try {
    raw = (0, import_yaml.parse)(text7);
  } catch (error) {
    return err(invalid("the file is not valid YAML", message(error)));
  }
  const root = asRecord5(raw, "the file");
  if (!root.ok) return root;
  const unknown = rejectUnknownKeys(root.value, ROOT_KEYS, "the file");
  if (unknown) return err(unknown);
  if (root.value["version"] !== 1) {
    return err(invalid("`version` must be the number 1", describe(root.value["version"])));
  }
  const sourceRoot = optionalString(root.value, "sourceRoot", DEFAULT_SOURCE_ROOT);
  if (!sourceRoot.ok) return sourceRoot;
  const apiVersion = optionalString(root.value, "apiVersion", DEFAULT_API_VERSION);
  if (!apiVersion.ok) return apiVersion;
  const environments = parseEnvironments(root.value["environments"]);
  if (!environments.ok) return environments;
  return ok({
    version: 1,
    sourceRoot: sourceRoot.value,
    apiVersion: apiVersion.value,
    environments: environments.value
  });
}
var ROOT_KEYS = ["version", "sourceRoot", "apiVersion", "environments"];
var ENVIRONMENT_KEYS = [
  "branch",
  "org",
  "allowDestructiveChanges",
  "tests",
  "gates",
  "preDeployment",
  "postDeployment"
];
var GATE_KEYS = ["name", "run", "timeoutMinutes"];
var STEP_KEYS = ["name", "run", "timeoutMinutes", "manual", "instructions"];
var TESTS_KEYS = ["mode", "classes"];
function parseEnvironments(raw) {
  const record = asRecord5(raw, "`environments`");
  if (!record.ok) return record;
  const ids = Object.keys(record.value).sort();
  if (ids.length === 0) return err(invalid("`environments` must define at least one environment"));
  const environments = [];
  for (const id of ids) {
    const environment = parseEnvironment(id, record.value[id]);
    if (!environment.ok) return environment;
    environments.push(environment.value);
  }
  return ok(environments);
}
function parseEnvironment(id, raw) {
  const where = `environment \`${id}\``;
  const record = asRecord5(raw, where);
  if (!record.ok) return record;
  const unknown = rejectUnknownKeys(record.value, ENVIRONMENT_KEYS, where);
  if (unknown) return err(unknown);
  const branch = requiredString(record.value, "branch", where);
  if (!branch.ok) return branch;
  const org = requiredString(record.value, "org", where);
  if (!org.ok) return org;
  const allowDestructiveChanges = requiredBoolean(record.value, "allowDestructiveChanges", where);
  if (!allowDestructiveChanges.ok) return allowDestructiveChanges;
  const tests = parseTests(record.value["tests"], where);
  if (!tests.ok) return tests;
  const gates = parseGates(record.value["gates"], where);
  if (!gates.ok) return gates;
  const preDeployment = parseSteps(
    record.value["preDeployment"],
    `\`preDeployment\` of ${where}`,
    true
  );
  if (!preDeployment.ok) return preDeployment;
  const postDeployment = parseSteps(
    record.value["postDeployment"],
    `\`postDeployment\` of ${where}`,
    false
  );
  if (!postDeployment.ok) return postDeployment;
  return ok({
    id,
    branch: branch.value,
    org: org.value,
    allowDestructiveChanges: allowDestructiveChanges.value,
    tests: tests.value,
    gates: gates.value,
    preDeployment: preDeployment.value,
    postDeployment: postDeployment.value
  });
}
function parseGates(raw, where) {
  const entries = asList(raw, `\`gates\` of ${where}`);
  if (!entries.ok) return entries;
  const gates = [];
  for (const entry of entries.value) {
    const record = asRecord5(entry, `a gate of ${where}`);
    if (!record.ok) return record;
    const unknown = rejectUnknownKeys(record.value, GATE_KEYS, `a gate of ${where}`);
    if (unknown) return err(unknown);
    const name = requiredString(record.value, "name", `a gate of ${where}`);
    if (!name.ok) return name;
    const safeName = requireSafeExecutionName(name.value, "gate", where);
    if (!safeName.ok) return safeName;
    const run = requiredString(record.value, "run", `gate \`${name.value}\``);
    if (!run.ok) return run;
    const timeoutMinutes = parseTimeout(record.value, `gate \`${name.value}\``);
    if (!timeoutMinutes.ok) return timeoutMinutes;
    gates.push({ name: name.value, run: run.value, timeoutMinutes: timeoutMinutes.value });
  }
  const duplicate = duplicateName(gates);
  if (duplicate !== void 0) {
    return err(invalid(`\`gates\` of ${where} has two gates named \`${duplicate}\``));
  }
  return ok(gates);
}
function parseSteps(raw, where, allowManual) {
  const entries = asList(raw, where);
  if (!entries.ok) return entries;
  const steps2 = [];
  for (const entry of entries.value) {
    const record = asRecord5(entry, `a step of ${where}`);
    if (!record.ok) return record;
    const unknown = rejectUnknownKeys(record.value, STEP_KEYS, `a step of ${where}`);
    if (unknown) return err(unknown);
    const name = requiredString(record.value, "name", `a step of ${where}`);
    if (!name.ok) return name;
    const safeName = requireSafeExecutionName(name.value, "step", where);
    if (!safeName.ok) return safeName;
    const manual = record.value["manual"];
    if (manual !== void 0 && typeof manual !== "boolean") {
      return err(invalid(`\`manual\` of step \`${name.value}\` must be true or false`, describe(manual)));
    }
    if (manual === true) {
      if (!allowManual) {
        return err(
          invalid(
            `step \`${name.value}\` is manual, but the MVP supports manual steps only before deployment`
          )
        );
      }
      if ("run" in record.value) {
        return err(invalid(`step \`${name.value}\` is manual, so it cannot also have \`run\``));
      }
      const instructions = requiredString(record.value, "instructions", `step \`${name.value}\``);
      if (!instructions.ok) return instructions;
      steps2.push({ kind: "manual", name: name.value, instructions: instructions.value });
      continue;
    }
    const run = requiredString(record.value, "run", `step \`${name.value}\``);
    if (!run.ok) return run;
    const timeoutMinutes = parseTimeout(record.value, `step \`${name.value}\``);
    if (!timeoutMinutes.ok) return timeoutMinutes;
    steps2.push({
      kind: "automatic",
      name: name.value,
      run: run.value,
      timeoutMinutes: timeoutMinutes.value
    });
  }
  const duplicate = duplicateName(steps2);
  if (duplicate !== void 0) {
    return err(invalid(`${where} has two steps named \`${duplicate}\``));
  }
  return ok(steps2);
}
var EXECUTION_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
function requireSafeExecutionName(name, kind, where) {
  if (EXECUTION_NAME.test(name)) return ok(name);
  return err(
    invalid(
      `${kind} name \`${name}\` of ${where} must start with a letter or number and contain at most 64 letters, numbers, dots, underscores or hyphens`
    )
  );
}
function duplicateName(entries) {
  const names = entries.map((entry) => entry.name);
  return names.find((name, index) => names.indexOf(name) !== index);
}
function parseTimeout(record, where) {
  const value = record["timeoutMinutes"];
  if (value === void 0) return ok(DEFAULT_STEP_TIMEOUT_MINUTES);
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    return err(invalid(`\`timeoutMinutes\` of ${where} must be a positive whole number`, describe(value)));
  }
  return ok(value);
}
function asList(raw, where) {
  if (raw === void 0) return ok([]);
  if (!Array.isArray(raw)) return err(invalid(`${where} must be a list`, describe(raw)));
  return ok(raw);
}
function parseTests(raw, where) {
  const record = asRecord5(raw, `\`tests\` of ${where}`);
  if (!record.ok) return record;
  const unknown = rejectUnknownKeys(record.value, TESTS_KEYS, `\`tests\` of ${where}`);
  if (unknown) return err(unknown);
  const mode = record.value["mode"];
  if (mode === "all") {
    if ("classes" in record.value) {
      return err(invalid(`\`tests.classes\` of ${where} is meaningless with mode \`all\``));
    }
    return ok({ mode: "all" });
  }
  if (mode !== "specified") {
    return err(invalid(`\`tests.mode\` of ${where} must be \`all\` or \`specified\``, describe(mode)));
  }
  const classes = record.value["classes"];
  if (!Array.isArray(classes) || classes.length === 0) {
    return err(
      invalid(
        `\`tests.classes\` of ${where} must be a non-empty list when mode is \`specified\``,
        describe(classes)
      )
    );
  }
  for (const entry of classes) {
    if (typeof entry !== "string" || entry.trim() === "") {
      return err(invalid(`\`tests.classes\` of ${where} must contain test class names`, describe(entry)));
    }
  }
  return ok({ mode: "specified", classes: [...classes] });
}
function asRecord5(value, where) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return err(invalid(`${where} must be a mapping`, describe(value)));
  }
  return ok(value);
}
function requiredString(record, key, where) {
  const value = record[key];
  if (typeof value !== "string" || value.trim() === "") {
    return err(invalid(`\`${key}\` of ${where} must be a non-empty string`, describe(value)));
  }
  return ok(value);
}
function requiredBoolean(record, key, where) {
  const value = record[key];
  if (typeof value !== "boolean") {
    return err(invalid(`\`${key}\` of ${where} must be true or false`, describe(value)));
  }
  return ok(value);
}
function optionalString(record, key, fallback) {
  if (!(key in record)) return ok(fallback);
  return requiredString(record, key, "the file");
}
function rejectUnknownKeys(record, allowed, where) {
  const unknown = Object.keys(record).filter((key) => !allowed.includes(key));
  if (unknown.length === 0) return void 0;
  return invalid(`${where} has unknown keys: ${unknown.sort().join(", ")}`);
}
function invalid(problem, found) {
  const suffix = found === void 0 ? "" : ` (found ${found})`;
  return docketError(ErrorCode.invalidConfig, `docket.yml: ${problem}${suffix}`);
}
function describe(value) {
  if (value === void 0) return "nothing";
  if (value === null) return "null";
  if (Array.isArray(value)) return `a list of ${value.length}`;
  if (typeof value === "object") return "a mapping";
  return `${typeof value} ${JSON.stringify(value)}`;
}
function message(error) {
  return error instanceof Error ? error.message.split("\n")[0] ?? "" : String(error);
}

// src/lib/features/config/select-environment.ts
function selectEnvironment(config, id) {
  const found = config.environments.find((environment) => environment.id === id);
  if (found !== void 0) return ok(found);
  const known = config.environments.map((environment) => environment.id).join(", ");
  return err(
    docketError(ErrorCode.unknownEnvironment, `unknown environment: ${id} (configured: ${known})`)
  );
}
function requireTargetBranch(environment, branch) {
  if (environment.branch === branch) return ok(environment);
  return err(
    docketError(
      ErrorCode.branchMismatch,
      `environment ${environment.id} deploys \`${environment.branch}\`, but the pull request targets \`${branch}\``
    )
  );
}

// src/lib/features/git/read-file.ts
async function readFileAtCommit(request) {
  const sha = parseCommitSha(request.sha, "commit SHA", ErrorCode.gitFailed);
  if (!sha.ok) return sha;
  const result = await runGit(["show", "--end-of-options", `${sha.value}:${request.path}`], {
    cwd: request.cwd
  });
  if (result.startError !== null || result.exitCode !== 0) {
    return err(
      docketError(
        ErrorCode.gitFailed,
        `cannot read \`${request.path}\` at ${sha.value}: ${result.startError ?? firstLine3(result.stderr)}`
      )
    );
  }
  return ok(result.stdout);
}
function firstLine3(stderr) {
  return stderr.trim().split("\n")[0] ?? "";
}

// src/lib/features/git/workspace.ts
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join as join6 } from "node:path";
async function createWorkspace(request) {
  const sha = parseCommitSha(request.sha, "commit SHA", ErrorCode.gitFailed);
  if (!sha.ok) return sha;
  const directory = await mkdtemp(join6(tmpdir(), "docket-workspace-"));
  const archive = join6(directory, "tree.tar");
  const remove = () => rm(directory, { recursive: true, force: true });
  const exported = await runGit(["archive", "--format=tar", "--output", archive, "--end-of-options", sha.value], {
    cwd: request.cwd
  });
  if (exported.startError !== null || exported.exitCode !== 0) {
    await remove();
    return err(
      docketError(
        ErrorCode.gitFailed,
        `cannot export ${sha.value}: ${exported.startError ?? firstLine4(exported.stderr)}`
      )
    );
  }
  const extracted = await runProcess("tar", ["-xf", archive, "-C", directory]);
  if (extracted.startError !== null || extracted.exitCode !== 0) {
    await remove();
    return err(
      docketError(
        ErrorCode.gitFailed,
        `cannot unpack ${sha.value}: ${extracted.startError ?? firstLine4(extracted.stderr)}`
      )
    );
  }
  await rm(archive, { force: true });
  return ok({ directory, sha: sha.value, remove });
}
async function withWorkspace(request, work) {
  const workspace = await createWorkspace(request);
  if (!workspace.ok) return workspace;
  try {
    return await work(workspace.value);
  } finally {
    await workspace.value.remove();
  }
}
function firstLine4(stderr) {
  return stderr.trim().split("\n")[0] ?? "";
}

// src/lib/features/salesforce/deploy.ts
function deployArgs(mode, request) {
  const args = [
    "project",
    "deploy",
    mode === "validate" ? "validate" : "start",
    "--manifest",
    request.manifestPath,
    "--target-org",
    request.org,
    "--wait",
    String(request.waitMinutes)
  ];
  if (request.destructivePath !== void 0) {
    args.push("--pre-destructive-changes", request.destructivePath);
  }
  if (request.tests.mode === "all") {
    args.push("--test-level", "RunLocalTests");
  } else {
    args.push("--test-level", "RunSpecifiedTests");
    for (const className of request.tests.classes) args.push("--tests", className);
  }
  return args;
}
async function runDeployment(cli, mode, request) {
  const envelope = await runSf(cli, deployArgs(mode, request));
  if (!envelope.ok) return envelope;
  const result = asRecord6(envelope.value.result);
  if (result === void 0) {
    const detail = envelope.value.message ?? `sf exited ${envelope.value.exitCode}`;
    return err(docketError(ErrorCode.salesforceFailed, `Salesforce returned no result: ${detail}`));
  }
  const deploymentId = typeof result["id"] === "string" ? result["id"] : void 0;
  if (deploymentId === void 0) {
    return err(
      docketError(ErrorCode.salesforceFailed, "Salesforce returned a deployment without an id")
    );
  }
  const status = typeof result["status"] === "string" ? result["status"] : "Unknown";
  const reportedSuccess = result["success"];
  const checkOnly = result["checkOnly"];
  if (typeof reportedSuccess !== "boolean" || typeof checkOnly !== "boolean") {
    return err(
      docketError(
        ErrorCode.salesforceFailed,
        "Salesforce returned a deployment without boolean success/checkOnly fields"
      )
    );
  }
  const expectedCheckOnly = mode === "validate";
  if (checkOnly !== expectedCheckOnly) {
    return err(
      docketError(
        ErrorCode.salesforceFailed,
        `Salesforce answered ${mode} with checkOnly=${String(checkOnly)}`
      )
    );
  }
  const statusSucceeded = status === "Succeeded";
  if (reportedSuccess !== statusSucceeded) {
    return err(
      docketError(
        ErrorCode.salesforceFailed,
        `Salesforce returned contradictory success=${String(reportedSuccess)} and status=${status}`
      )
    );
  }
  const cliSucceeded = envelope.value.status === 0 && envelope.value.exitCode === 0;
  if (reportedSuccess !== cliSucceeded) {
    return err(
      docketError(
        ErrorCode.salesforceFailed,
        `Salesforce result disagrees with CLI status ${envelope.value.status} and exit ${envelope.value.exitCode}`
      )
    );
  }
  const details = asRecord6(result["details"]) ?? {};
  return ok({
    deploymentId,
    status,
    success: reportedSuccess,
    checkOnly,
    componentFailures: componentFailures(details["componentFailures"]),
    tests: testOutcome(details["runTestResult"])
  });
}
function componentFailures(raw) {
  return asArray(raw).flatMap((entry) => {
    const failure = asRecord6(entry);
    if (failure === void 0) return [];
    return [
      {
        type: text5(failure["componentType"]) || "Unknown",
        member: text5(failure["fullName"]) || text5(failure["name"]) || "Unknown",
        problem: text5(failure["problem"]) || "no detail reported"
      }
    ];
  });
}
function testOutcome(raw) {
  const tests = asRecord6(raw);
  if (tests === void 0) return { run: 0, failed: 0, failures: [] };
  return {
    run: count(tests["numTestsRun"]),
    failed: count(tests["numFailures"]),
    failures: asArray(tests["failures"]).flatMap((entry) => {
      const failure = asRecord6(entry);
      if (failure === void 0) return [];
      return [
        {
          className: text5(failure["name"]) || "Unknown",
          method: text5(failure["methodName"]) || "Unknown",
          message: text5(failure["message"]) || "no detail reported"
        }
      ];
    })
  };
}
function asRecord6(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function asArray(value) {
  if (Array.isArray(value)) return value;
  return value === void 0 || value === null ? [] : [value];
}
function text5(value) {
  return typeof value === "string" ? value : "";
}
function count(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

// src/lib/features/steps/run-steps.ts
var CREDENTIAL_VARIABLES = [
  "SF_AUTH_URL",
  "SFDX_AUTH_URL",
  "SF_ACCESS_TOKEN",
  "SFDX_ACCESS_TOKEN",
  "SF_CLIENT_SECRET",
  "SF_JWT_KEY",
  "SF_JWT_KEY_FILE",
  "GITHUB_TOKEN",
  "GH_TOKEN",
  "ACTIONS_RUNTIME_TOKEN",
  "ACTIONS_RUNTIME_URL",
  "ACTIONS_RESULTS_URL",
  "ACTIONS_ID_TOKEN_REQUEST_TOKEN",
  "ACTIONS_ID_TOKEN_REQUEST_URL"
];
function runGates(gates, request) {
  return runSteps(
    gates.map((gate) => ({
      kind: "automatic",
      name: gate.name,
      run: gate.run,
      timeoutMinutes: gate.timeoutMinutes
    })),
    { ...request, kind: "gate" }
  );
}
async function runSteps(steps2, request) {
  const results = [];
  const logs = [];
  let stopped = false;
  for (const step of steps2) {
    if (stopped) {
      results.push(skipped(step, request.kind));
      continue;
    }
    if (step.kind === "manual") {
      const done = request.completed?.has(step.name) === true;
      results.push({
        name: step.name,
        kind: request.kind,
        manual: true,
        status: done ? "passed" : "pending",
        exitCode: null,
        completedBy: request.completedBy?.get(step.name) ?? null
      });
      if (!done) stopped = true;
      continue;
    }
    const process2 = await runProcess("bash", ["-c", step.run], {
      cwd: request.cwd,
      timeoutMs: step.timeoutMinutes * 6e4,
      ...request.withoutCredentials ? { removeEnv: CREDENTIAL_VARIABLES } : {},
      ...request.signal === void 0 ? {} : { signal: request.signal }
    });
    const passed = process2.startError === null && process2.exitCode === 0 && process2.terminatedBy === null;
    results.push({
      name: step.name,
      kind: request.kind,
      manual: false,
      status: passed ? "passed" : "failed",
      exitCode: process2.exitCode,
      completedBy: null
    });
    logs.push({
      name: `${request.kind}-${step.name}.log`,
      contents: logOf(step.run, process2)
    });
    if (!passed) stopped = true;
  }
  return { results, logs };
}
function skipped(step, kind) {
  return {
    name: step.name,
    kind,
    manual: step.kind === "manual",
    status: "skipped",
    exitCode: null,
    completedBy: null
  };
}
function logOf(command, process2) {
  return [
    `$ ${command}`,
    process2.stdout,
    process2.stderr,
    process2.startError !== null ? `failed to start: ${process2.startError}` : process2.terminatedBy === null ? `exit ${process2.exitCode}` : `${process2.terminatedBy} after exit ${process2.exitCode}`,
    ""
  ].join("\n");
}

// src/lib/features/pipeline/deploy-run.ts
async function deployRun(request) {
  const validated = await readValidatedRun(request.validatedDirectory);
  if (!validated.ok) return validated;
  const { plan, validation } = validated.value;
  if (request.expectedPlanIdentity !== void 0 && request.expectedPlanIdentity !== plan.identity) {
    return err(
      docketError(
        ErrorCode.planMismatch,
        `refusing to deploy: the green check approved ${request.expectedPlanIdentity}, but the downloaded plan is ${plan.identity}`
      )
    );
  }
  if (request.expectedHeadSha !== void 0 && request.expectedHeadSha !== plan.source.headSha) {
    return err(
      docketError(
        ErrorCode.planMismatch,
        `refusing to deploy: the validated plan is for ${plan.source.headSha}, but GitHub reports ${request.expectedHeadSha}`
      )
    );
  }
  const trusted = await trustedEnvironment(request.repositoryDirectory, plan);
  if (!trusted.ok) return trusted;
  const manual = await requireManualSteps(request, plan);
  if (!manual.ok) return manual;
  const org = await resolveOrg({ ...request.cli, cwd: request.repositoryDirectory }, plan.target.org);
  if (!org.ok) return org;
  const expected = requireOrgId(org.value, plan.target.orgId);
  if (!expected.ok) return expected;
  const completed = new Set(manual.value.keys());
  const completedBy = new Map(
    [...manual.value].map(([name, completion]) => [name, completion.completedBy])
  );
  const executed = await withWorkspace(
    { cwd: request.repositoryDirectory, sha: plan.source.headSha },
    (candidateWorkspace) => withWorkspace(
      // Privileged hook bytes come from the trusted base tree. A pull
      // request may change the same script at head, but those bytes are
      // never executed with deployment credentials.
      { cwd: request.repositoryDirectory, sha: plan.source.baseSha },
      async (trustedWorkspace) => {
        const before = await runSteps(trusted.value.preDeployment, {
          cwd: trustedWorkspace.directory,
          kind: "pre",
          withoutCredentials: false,
          completed,
          completedBy,
          ...request.signal === void 0 ? {} : { signal: request.signal }
        });
        if (before.results.some((step) => step.status === "failed")) {
          return ok({ steps: before.results, logs: before.logs, deployment: null });
        }
        const deployment = planChangesMetadata(plan) ? await runDeployment(
          { ...request.cli, cwd: candidateWorkspace.directory },
          "deploy",
          {
            manifestPath: validated.value.packageXmlPath,
            destructivePath: validated.value.destructiveChangesXmlPath,
            org: plan.target.org,
            tests: plan.tests,
            waitMinutes: request.waitMinutes
          }
        ) : ok(null);
        if (!deployment.ok) return deployment;
        const after = await runSteps(trusted.value.postDeployment, {
          cwd: trustedWorkspace.directory,
          kind: "post",
          withoutCredentials: false,
          completed,
          completedBy,
          ...request.signal === void 0 ? {} : { signal: request.signal }
        });
        return ok({
          steps: [...before.results, ...after.results],
          logs: [...before.logs, ...after.logs],
          deployment: deployment.value
        });
      }
    )
  );
  if (!executed.ok) return executed;
  const run = recordOf(request, plan, validation, executed.value.steps, executed.value.deployment);
  const written = await writeRunArtifacts(request.outputDirectory, {
    plan: {
      plan,
      packageXml: await readFile3(validated.value.packageXmlPath, "utf8"),
      destructiveChangesXml: validated.value.destructiveChangesXmlPath === void 0 ? void 0 : await readFile3(validated.value.destructiveChangesXmlPath, "utf8"),
      report: renderReport(plan)
    },
    validation,
    run,
    logs: executed.value.logs
  });
  if (!written.ok) return written;
  return ok(run);
}
function recordOf(request, plan, validation, steps2, deployment) {
  const missingAnswer = planChangesMetadata(plan) && deployment === null;
  const failed = missingAnswer || deployment !== null && !deployment.success || steps2.some((step) => step.status === "failed");
  return {
    schema: RUN_SCHEMA,
    kind: request.kind ?? "deploy",
    executor: request.executor,
    status: failed ? "failed" : "passed",
    timing: request.timing,
    plan,
    validation,
    deployment,
    steps: steps2,
    workflow: request.workflow ?? null,
    mergeCommit: request.mergeCommit ?? null,
    artifactsExpireAt: request.artifactsExpireAt ?? null
  };
}
async function trustedEnvironment(repositoryDirectory, plan) {
  const text7 = await readFileAtCommit({
    cwd: repositoryDirectory,
    sha: plan.source.baseSha,
    path: CONFIG_FILE_NAME
  });
  if (!text7.ok) return text7;
  const config = parseConfig(text7.value);
  if (!config.ok) return config;
  const environment = selectEnvironment(config.value, plan.target.environmentId);
  if (!environment.ok) return environment;
  const recorded = canonicalJson(plan.steps);
  const current = canonicalJson({
    gates: environment.value.gates,
    preDeployment: environment.value.preDeployment,
    postDeployment: environment.value.postDeployment
  });
  if (recorded !== current) {
    return err(
      docketError(
        ErrorCode.planMismatch,
        "refusing to deploy: the configured steps are not the ones this plan was validated with"
      )
    );
  }
  return environment;
}
async function requireManualSteps(request, plan) {
  const required = plan.steps.preDeployment.filter((step) => step.kind === "manual");
  if (required.length === 0) return ok(/* @__PURE__ */ new Map());
  const completions = request.completionsDirectory === void 0 ? ok([]) : await readCompletions(request.completionsDirectory);
  if (!completions.ok) return completions;
  const done = completedSteps(completions.value, plan.identity, plan.source.headSha);
  const missing = required.filter((step) => !done.has(step.name));
  if (missing.length > 0) {
    return err(
      docketError(
        ErrorCode.stepIncomplete,
        `refusing to deploy: manual steps not completed: ${missing.map((step) => step.name).join(", ")}`
      )
    );
  }
  return ok(done);
}

// src/lib/features/cli/commands/deploy/deploy-command.ts
var flags3 = flagsFor(
  "repo",
  "repository",
  "pull-request",
  "base",
  "head",
  "validated-run",
  "expected-plan-identity",
  "steps",
  "merge-commit",
  "require-merged",
  "sf",
  "wait",
  "out",
  "workflow-run-id",
  "workflow-run-attempt",
  "artifacts-expire-at",
  "github-token"
);
var deployCommand = defineCommand({
  name: "deploy",
  summary: "Deploy a plan that has already been validated",
  flags: flags3,
  run: async (options, context) => {
    const validated = requiredOption(options["validated-run"], "--validated-run");
    if (!validated.ok) return validated;
    const waitMinutes = waitMinutesOf(options);
    if (!waitMinutes.ok) return waitMinutes;
    const execution = executionOf(options);
    if (!execution.ok) return execution;
    const expectedPlanIdentity = expectedPlanIdentityOf(options);
    if (!expectedPlanIdentity.ok) return expectedPlanIdentity;
    const artifactsExpireAt = artifactsExpireAtOf(options);
    if (!artifactsExpireAt.ok) return artifactsExpireAt;
    const repositoryDirectory = repositoryDirectoryOf(options, context.cwd);
    const outputDirectory = outputDirectoryOf(options, context.cwd, "deploy");
    const startedAt = context.now().toISOString();
    let mergeCommit;
    if (options["merge-commit"] !== void 0) {
      const parsed = parseCommitSha(
        options["merge-commit"],
        "--merge-commit",
        ErrorCode.invalidOption
      );
      if (!parsed.ok) return parsed;
      mergeCommit = parsed.value;
    }
    let expectedHeadSha;
    if (options["require-merged"] === true) {
      const merged = await resolveSource(options, context, "merged");
      if (!merged.ok) return merged;
      mergeCommit = merged.value.pullRequest?.mergeCommitSha ?? mergeCommit;
      expectedHeadSha = merged.value.source.headSha;
    }
    const run = await deployRun({
      validatedDirectory: isAbsolute3(validated.value) ? validated.value : join7(context.cwd, validated.value),
      repositoryDirectory,
      outputDirectory,
      cli: { executable: sfExecutableOf(options), timeoutMs: timeoutMsOf(waitMinutes.value) },
      waitMinutes: waitMinutes.value,
      executor: execution.value.executor,
      timing: { startedAt, finishedAt: context.now().toISOString() },
      ...execution.value.workflow === void 0 ? {} : { workflow: execution.value.workflow },
      ...expectedPlanIdentity.value === void 0 ? {} : { expectedPlanIdentity: expectedPlanIdentity.value },
      ...options.steps === void 0 ? {} : {
        completionsDirectory: isAbsolute3(options.steps) ? options.steps : join7(context.cwd, options.steps)
      },
      ...mergeCommit === void 0 ? {} : { mergeCommit },
      ...expectedHeadSha === void 0 ? {} : { expectedHeadSha },
      ...artifactsExpireAt.value === void 0 ? {} : { artifactsExpireAt: artifactsExpireAt.value }
    });
    if (!run.ok) return run;
    return ok({ kind: "run", run: run.value, directory: outputDirectory });
  }
});

// src/lib/features/pipeline/gate-run.ts
import { mkdir as mkdir3, readFile as readFile4, writeFile as writeFile3 } from "node:fs/promises";
import { dirname as dirname2, join as join8 } from "node:path";
var GATE_RUN_SCHEMA = "docket.gates/v1";
var GATE_ARTIFACT_NAME = "gates.json";
async function gateRun(request) {
  const environment = await trustedEnvironment2(request);
  if (!environment.ok) return environment;
  const outcome2 = await withWorkspace(
    { cwd: request.repositoryDirectory, sha: request.source.headSha },
    async (workspace) => ok(
      await runGates(environment.value.gates, {
        cwd: workspace.directory,
        withoutCredentials: true,
        ...request.signal === void 0 ? {} : { signal: request.signal }
      })
    )
  );
  if (!outcome2.ok) return outcome2;
  const record = {
    schema: GATE_RUN_SCHEMA,
    source: request.source,
    environmentId: request.environmentId,
    targetBranch: request.targetBranch,
    gatesDigest: gatesDigestOf(environment.value),
    status: outcome2.value.results.some((result) => result.status !== "passed") ? "failed" : "passed",
    results: outcome2.value.results
  };
  const written = await writeGateArtifacts(request.outputDirectory, record, outcome2.value.logs);
  if (!written.ok) return written;
  return ok(record);
}
async function readPassedGateRun(directory, expected) {
  const text7 = await readFile4(join8(directory, GATE_ARTIFACT_NAME), "utf8").catch(() => void 0);
  if (text7 === void 0) return err(invalidGate(`${GATE_ARTIFACT_NAME} is missing`));
  let parsed;
  try {
    parsed = JSON.parse(text7);
  } catch {
    return err(invalidGate(`${GATE_ARTIFACT_NAME} is not readable JSON`));
  }
  const record = asRecord7(parsed);
  if (record?.["schema"] !== GATE_RUN_SCHEMA) {
    return err(invalidGate(`${GATE_ARTIFACT_NAME} is not a ${GATE_RUN_SCHEMA} document`));
  }
  if (canonicalJson(record["source"]) !== canonicalJson(expected.source)) {
    return err(invalidGate("the gate run belongs to a different repository, pull request or SHA"));
  }
  if (record["environmentId"] !== expected.environment.id || record["targetBranch"] !== expected.targetBranch) {
    return err(invalidGate("the gate run belongs to a different environment or target branch"));
  }
  if (record["gatesDigest"] !== gatesDigestOf(expected.environment)) {
    return err(invalidGate("the configured gates changed after the gate run"));
  }
  if (record["status"] !== "passed") {
    return err(
      docketError(ErrorCode.validationNotPassed, "candidate quality gates did not pass in the credential-free job")
    );
  }
  const results = passedResults(record["results"], expected.environment);
  if (!results.ok) return results;
  const logs = [];
  for (const gate of expected.environment.gates) {
    const name = `gate-${gate.name}.log`;
    const contents = await readFile4(join8(directory, "logs", name), "utf8").catch(() => void 0);
    if (contents === void 0) return err(invalidGate(`logs/${name} is missing`));
    if (findSecrets(contents).length > 0) {
      return err(invalidGate(`logs/${name} contains credential-shaped text`));
    }
    logs.push({ name, contents });
  }
  return ok({ results: results.value, logs });
}
function gatesDigestOf(environment) {
  return digestOf(canonicalJson(environment.gates));
}
async function trustedEnvironment2(request) {
  const text7 = await readFileAtCommit({
    cwd: request.repositoryDirectory,
    sha: request.source.baseSha,
    path: CONFIG_FILE_NAME
  });
  if (!text7.ok) return text7;
  const config = parseConfig(text7.value);
  if (!config.ok) return config;
  const environment = selectEnvironment(config.value, request.environmentId);
  if (!environment.ok) return environment;
  const branch = requireTargetBranch(environment.value, request.targetBranch);
  return branch.ok ? environment : branch;
}
async function writeGateArtifacts(directory, record, logs) {
  const files = /* @__PURE__ */ new Map([[GATE_ARTIFACT_NAME, canonicalJsonFile(record)]]);
  for (const log of logs) files.set(join8("logs", log.name), log.contents);
  for (const [name, contents] of files) {
    const finding = findSecrets(contents)[0];
    if (finding !== void 0) {
      return err(
        docketError(
          ErrorCode.secretInArtifact,
          `refusing to write ${name}: it contains a ${finding.rule} on line ${finding.line}`
        )
      );
    }
  }
  for (const [name, contents] of files) {
    const target = join8(directory, name);
    await mkdir3(dirname2(target), { recursive: true });
    await writeFile3(target, contents, "utf8");
  }
  return ok([...files.keys()].sort());
}
function passedResults(raw, environment) {
  if (!Array.isArray(raw) || raw.length !== environment.gates.length) {
    return err(invalidGate("the recorded gate results do not match the configured gates"));
  }
  const results = [];
  for (const [index, gate] of environment.gates.entries()) {
    const value = asRecord7(raw[index]);
    if (value?.["name"] !== gate.name || value["kind"] !== "gate" || value["manual"] !== false || value["status"] !== "passed" || value["exitCode"] !== 0 || value["completedBy"] !== null) {
      return err(invalidGate(`the recorded result for gate \`${gate.name}\` is not a pass`));
    }
    results.push({
      name: gate.name,
      kind: "gate",
      manual: false,
      status: "passed",
      exitCode: 0,
      completedBy: null
    });
  }
  return ok(results);
}
function asRecord7(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function invalidGate(problem) {
  return docketError(ErrorCode.planMismatch, `refusing to validate: ${problem}`);
}

// src/lib/features/cli/commands/gates/gates-command.ts
var flags4 = flagsFor(
  "repo",
  "repository",
  "pull-request",
  "base",
  "head",
  "environment",
  "target-branch",
  "out",
  "github-token"
);
var gatesCommand = defineCommand({
  name: "gates",
  summary: "Run candidate quality gates without deployment credentials",
  flags: flags4,
  run: async (options, context) => {
    const source = await resolveSource(options, context);
    if (!source.ok) return source;
    const environment = requiredOption(options.environment, "--environment");
    if (!environment.ok) return environment;
    const targetBranch = requiredOption(source.value.targetBranch, "--target-branch");
    if (!targetBranch.ok) return targetBranch;
    const outputDirectory = outputDirectoryOf(options, context.cwd, "gates");
    const run = await gateRun({
      repositoryDirectory: repositoryDirectoryOf(options, context.cwd),
      outputDirectory,
      source: source.value.source,
      environmentId: environment.value,
      targetBranch: targetBranch.value
    });
    if (!run.ok) return run;
    return ok({ kind: "gate-run", run: run.value, directory: outputDirectory });
  }
});

// src/lib/features/audit/deployment-history.ts
import { mkdir as mkdir4, readdir as readdir2, writeFile as writeFile4 } from "node:fs/promises";
import { join as join9 } from "node:path";

// src/lib/shared/text/compare-text.ts
function compareText(left, right) {
  return left === right ? 0 : left < right ? -1 : 1;
}

// src/lib/features/audit/deployment-history.ts
var DEPLOYMENT_HISTORY_SCHEMA = "docket.deployment-history/v1";
var HISTORY_ARTIFACT_NAMES = {
  json: "history.json",
  report: "history.md"
};
async function buildDeploymentHistory(root) {
  const directories = await discoverRunDirectories(root);
  if (!directories.ok) return directories;
  if (directories.value.length === 0) {
    return err(invalid2(`no run.json artifacts were found below ${root}`));
  }
  const byId = /* @__PURE__ */ new Map();
  for (const directory of directories.value) {
    const recorded = await readRecordedRun(directory);
    if (!recorded.ok) {
      return err(invalid2(`invalid run bundle below ${root}: ${recorded.error.message}`));
    }
    const run = recorded.value.run;
    if (run.kind === "validate") continue;
    const entry = historyEntry(run, run.kind);
    const existing = byId.get(entry.id);
    if (existing !== void 0 && canonicalJson(existing) !== canonicalJson(entry)) {
      return err(invalid2(`two run bundles claim history id ${entry.id} with different contents`));
    }
    byId.set(entry.id, entry);
  }
  const entries = [...byId.values()].sort((left, right) => {
    if (left.timing.finishedAt !== right.timing.finishedAt) {
      return left.timing.finishedAt > right.timing.finishedAt ? -1 : 1;
    }
    return compareText(left.id, right.id);
  });
  if (entries.length === 0) {
    return err(invalid2("the supplied artifacts contain validation runs but no deployment runs"));
  }
  const knownExpiries = entries.map((entry) => entry.artifactsExpireAt).filter((value) => value !== null).sort(compareText);
  return ok({
    schema: DEPLOYMENT_HISTORY_SCHEMA,
    entries,
    retention: {
      boundedByArtifacts: true,
      earliestKnownExpiry: knownExpiries[0] ?? null,
      unknownExpiryEntries: entries.filter((entry) => entry.artifactsExpireAt === null).length
    }
  });
}
async function writeDeploymentHistory(directory, history) {
  const files = /* @__PURE__ */ new Map([
    [HISTORY_ARTIFACT_NAMES.json, canonicalJsonFile(history)],
    [HISTORY_ARTIFACT_NAMES.report, renderDeploymentHistory(history)]
  ]);
  for (const [name, contents] of files) {
    const finding = findSecrets(contents)[0];
    if (finding !== void 0) {
      return err(
        docketError(
          ErrorCode.secretInArtifact,
          `refusing to write ${name}: it contains a ${finding.rule} on line ${finding.line}`
        )
      );
    }
  }
  await mkdir4(directory, { recursive: true });
  for (const [name, contents] of files) await writeFile4(join9(directory, name), contents, "utf8");
  return ok([...files.keys()].sort(compareText));
}
function renderDeploymentHistory(history) {
  const lines = [
    "# Docket deployment history",
    "",
    "| Finished | Result | PR | Head | Org | Validation | Deployment | Workflow |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...history.entries.map(
      (entry) => `| ${[
        entry.timing.finishedAt,
        `${entry.kind}/${entry.status}`,
        `#${entry.pullRequest}`,
        `\`${entry.headSha}\``,
        `\`${entry.environment.orgId}\``,
        entry.validation.deploymentId === null ? entry.validation.verdict : `\`${entry.validation.deploymentId}\` ${entry.validation.verdict}`,
        entry.deployment === null ? "not started" : `\`${entry.deployment.deploymentId}\` ${entry.deployment.status}`,
        entry.workflow === null ? "local" : `${entry.workflow.runId}/${entry.workflow.runAttempt}`
      ].join(" | ")} |`
    ),
    "",
    `History is bounded by retained run artifacts. Unknown expiry: ${history.retention.unknownExpiryEntries}; earliest known expiry: ${history.retention.earliestKnownExpiry ?? "unknown"}.`,
    ""
  ];
  return lines.join("\n");
}
function historyEntry(run, kind) {
  const key = run.workflow === null ? digestOf(
    canonicalJson({
      kind,
      planIdentity: run.plan.identity,
      startedAt: run.timing.startedAt,
      deploymentId: run.deployment?.deploymentId ?? null
    })
  ) : `${run.plan.source.repository}:${run.workflow.runId}/${run.workflow.runAttempt}`;
  return {
    id: `${run.executor}:${key}`,
    kind,
    status: run.status,
    repository: run.plan.source.repository,
    pullRequest: run.plan.source.pullRequest,
    baseSha: run.plan.source.baseSha,
    headSha: run.plan.source.headSha,
    mergeCommit: run.mergeCommit,
    environment: {
      id: run.plan.target.environmentId,
      org: run.plan.target.org,
      orgId: run.plan.target.orgId
    },
    planIdentity: run.plan.identity,
    validation: {
      verdict: run.validation?.verdict ?? "failed",
      deploymentId: run.validation?.deployment?.deploymentId ?? null,
      status: run.validation?.deployment?.status ?? null
    },
    deployment: run.deployment === null ? null : {
      deploymentId: run.deployment.deploymentId,
      status: run.deployment.status,
      success: run.deployment.success
    },
    components: {
      deployable: run.plan.components.deployable.length,
      destructive: run.plan.components.destructive.length
    },
    steps: run.steps.map((step) => ({
      name: step.name,
      kind: step.kind,
      status: step.status,
      manual: step.manual,
      completedBy: step.completedBy
    })),
    workflow: run.workflow,
    timing: run.timing,
    artifactsExpireAt: run.artifactsExpireAt
  };
}
async function discoverRunDirectories(root) {
  const found = [];
  async function visit(directory) {
    let entries;
    try {
      entries = await readdir2(directory, { withFileTypes: true });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      return err(invalid2(`cannot read ${directory}: ${detail}`));
    }
    if (entries.some((entry) => entry.isFile() && entry.name === "run.json")) {
      found.push(directory);
      return ok(void 0);
    }
    for (const entry of entries.sort((left, right) => compareText(left.name, right.name))) {
      if (!entry.isDirectory()) continue;
      const nested = await visit(join9(directory, entry.name));
      if (!nested.ok) return nested;
    }
    return ok(void 0);
  }
  const visited = await visit(root);
  return visited.ok ? ok(found.sort(compareText)) : visited;
}
function invalid2(problem) {
  return docketError(ErrorCode.historyInvalid, `cannot build deployment history: ${problem}`);
}

// src/lib/features/cli/commands/history/history-command.ts
var flags5 = flagsFor("runs", "out");
var historyCommand = defineCommand({
  name: "history",
  summary: "Build deployment history from verified run artifacts",
  flags: flags5,
  run: async (options, context) => {
    const root = requiredOption(options.runs, "--runs");
    if (!root.ok) return root;
    const history = await buildDeploymentHistory(absolutePath(root.value, context.cwd));
    if (!history.ok) return history;
    let outputDirectory = null;
    if (options.out !== void 0) {
      outputDirectory = outputDirectoryOf(options, context.cwd, "history");
      const written = await writeDeploymentHistory(outputDirectory, history.value);
      if (!written.ok) return written;
    }
    return ok({ kind: "history", history: history.value, directory: outputDirectory });
  }
});

// src/lib/features/cli/commands/inspect-run/inspect-run-command.ts
var flags6 = flagsFor("run", "expected-plan-identity");
var inspectRunCommand = defineCommand({
  name: "inspect-run",
  summary: "Verify a run bundle before reading its routing fields",
  flags: flags6,
  run: async (options, context) => {
    const directory = requiredOption(options.run, "--run");
    if (!directory.ok) return directory;
    const identity = expectedPlanIdentityOf(options);
    if (!identity.ok) return identity;
    const bundle = absolutePath(directory.value, context.cwd);
    const recorded = await readRecordedRun(bundle);
    if (!recorded.ok) return recorded;
    if (identity.value !== void 0 && identity.value !== recorded.value.plan.identity) {
      return err(
        docketError(
          ErrorCode.planMismatch,
          `refusing run: expected ${identity.value}, but the verified bundle is ${recorded.value.plan.identity}`
        )
      );
    }
    return ok({ kind: "recorded-run", run: recorded.value.run, directory: bundle });
  }
});

// src/lib/features/cli/commands/locate-run/locate-run-command.ts
var flags7 = flagsFor("repository", "head", "github-token");
var locateRunCommand = defineCommand({
  name: "locate-run",
  summary: "Print the workflow run a green check points at",
  flags: flags7,
  run: async (options, context) => {
    const repository2 = requiredOption(options.repository, "--repository");
    if (!repository2.ok) return repository2;
    const head = requiredOption(options.head, "--head");
    if (!head.ok) return head;
    const headSha = parseCommitSha(head.value, "--head", ErrorCode.invalidOption);
    if (!headSha.ok) return headSha;
    const client = githubClientOf(options, context);
    if (!client.ok) return client;
    const originating = await findOriginatingRun(client.value, repository2.value, headSha.value);
    if (!originating.ok) return originating;
    return ok({ kind: "originating-run", originating: originating.value });
  }
});

// src/lib/features/cli/commands/locate-steps/locate-steps-command.ts
var flags8 = flagsFor("repository", "validated-run", "github-token");
var locateStepsCommand = defineCommand({
  name: "locate-steps",
  summary: "Print workflow runs holding manual-step completions",
  flags: flags8,
  run: async (options, context) => {
    const repository2 = requiredOption(options.repository, "--repository");
    if (!repository2.ok) return repository2;
    const directory = requiredOption(options["validated-run"], "--validated-run");
    if (!directory.ok) return directory;
    const client = githubClientOf(options, context);
    if (!client.ok) return client;
    const validated = await readValidatedRun(absolutePath(directory.value, context.cwd));
    if (!validated.ok) return validated;
    const manual = validated.value.plan.steps.preDeployment.flatMap(
      (step) => step.kind === "manual" ? [step.name] : []
    );
    const origins = await findStepCompletionRuns(client.value, {
      repository: repository2.value,
      headSha: validated.value.plan.source.headSha,
      planIdentity: validated.value.plan.identity,
      steps: manual
    });
    if (!origins.ok) return origins;
    return ok({ kind: "step-origins", origins: origins.value });
  }
});

// src/lib/features/cli/commands/plan/plan-command.ts
import { mkdir as mkdir5, writeFile as writeFile5 } from "node:fs/promises";
import { join as join10 } from "node:path";

// src/lib/features/pipeline/prepare.ts
async function prepareRun(request, resolveOrgId) {
  const text7 = await readFileAtCommit({
    cwd: request.repositoryDirectory,
    sha: request.source.baseSha,
    path: CONFIG_FILE_NAME
  });
  if (!text7.ok) return text7;
  const config = parseConfig(text7.value);
  if (!config.ok) return config;
  const selected = selectEnvironment(config.value, request.environmentId);
  if (!selected.ok) return selected;
  if (request.targetBranch !== void 0) {
    const matched = requireTargetBranch(selected.value, request.targetBranch);
    if (!matched.ok) return matched;
  }
  const changes = await readChanges({
    cwd: request.repositoryDirectory,
    baseSha: request.source.baseSha,
    headSha: request.source.headSha
  });
  if (!changes.ok) return changes;
  const orgId = await resolveOrgId(selected.value.org);
  if (!orgId.ok) return orgId;
  const plan = buildPlan({
    source: request.source,
    environment: selected.value,
    orgId: orgId.value,
    apiVersion: config.value.apiVersion,
    sourceRoot: config.value.sourceRoot,
    changes: changes.value
  });
  if (!plan.ok) return plan;
  return ok({ config: config.value, environment: selected.value, plan: plan.value });
}

// src/lib/features/cli/commands/plan/plan-command.ts
var flags9 = flagsFor(
  "repo",
  "repository",
  "pull-request",
  "base",
  "head",
  "environment",
  "target-branch",
  "org-id",
  "sf",
  "out",
  "github-token"
);
var planCommand = defineCommand({
  name: "plan",
  summary: "Build the deployment plan for a pull request",
  flags: flags9,
  run: async (options, context) => {
    const source = await resolveSource(options, context);
    if (!source.ok) return source;
    const environment = requiredOption(options.environment, "--environment");
    if (!environment.ok) return environment;
    const repositoryDirectory = repositoryDirectoryOf(options, context.cwd);
    const prepared = await prepareRun(
      {
        repositoryDirectory,
        source: source.value.source,
        environmentId: environment.value,
        targetBranch: source.value.targetBranch
      },
      orgResolverOf(options, repositoryDirectory)
    );
    if (!prepared.ok) return prepared;
    if (options.out !== void 0) {
      await writePlanArtifacts(
        outputDirectoryOf(options, context.cwd, "plan"),
        prepared.value.plan
      );
    }
    return ok({
      kind: "plan",
      plan: prepared.value.plan.plan,
      report: prepared.value.plan.report
    });
  }
});
async function writePlanArtifacts(directory, artifacts) {
  await mkdir5(directory, { recursive: true });
  await writeFile5(join10(directory, ARTIFACT_NAMES.plan), canonicalJsonFile(artifacts.plan), "utf8");
  await writeFile5(join10(directory, ARTIFACT_NAMES.packageXml), artifacts.packageXml, "utf8");
  await writeFile5(join10(directory, ARTIFACT_NAMES.report), artifacts.report, "utf8");
  if (artifacts.destructiveChangesXml !== void 0) {
    await writeFile5(
      join10(directory, ARTIFACT_NAMES.destructiveChangesXml),
      artifacts.destructiveChangesXml,
      "utf8"
    );
  }
}

// src/lib/features/cli/commands/publish-check/publish-check-command.ts
var flags10 = flagsFor(
  "repository",
  "validated-run",
  "head",
  "failed",
  "workflow-run-id",
  "details-url",
  "github-token"
);
var publishCheckCommand = defineCommand({
  name: "publish-check",
  summary: "Publish the recorded verdict as the required GitHub check",
  flags: flags10,
  run: async (options, context) => {
    const repository2 = requiredOption(options.repository, "--repository");
    if (!repository2.ok) return repository2;
    const client = githubClientOf(options, context);
    if (!client.ok) return client;
    if (options.failed !== void 0) {
      return publishFailure(client.value, repository2.value, options);
    }
    const directory = requiredOption(options["validated-run"], "--validated-run");
    if (!directory.ok) return directory;
    const workflowRunId = requiredOption(options["workflow-run-id"], "--workflow-run-id");
    if (!workflowRunId.ok) return workflowRunId;
    const run = await readRunRecord(absolutePath(directory.value, context.cwd));
    if (!run.ok) return run;
    if (run.value.workflow?.runId !== workflowRunId.value) {
      return err(
        docketError(
          ErrorCode.planMismatch,
          "refusing to publish: the validation artifact does not belong to this workflow run"
        )
      );
    }
    const published = await publishValidationCheck(client.value, {
      repository: repository2.value,
      headSha: run.value.plan.source.headSha,
      verdict: run.value.status,
      planIdentity: run.value.plan.identity,
      workflowRunId: workflowRunId.value,
      summary: summarize(run.value),
      ...options["details-url"] === void 0 ? {} : { detailsUrl: options["details-url"] }
    });
    if (!published.ok) return published;
    for (const step of run.value.steps) {
      if (!step.manual || step.status === "passed") continue;
      const stepCheck = await publishStepCheck(client.value, {
        repository: repository2.value,
        headSha: run.value.plan.source.headSha,
        step: step.name,
        planIdentity: run.value.plan.identity,
        validationWorkflowRunId: workflowRunId.value,
        ...options["details-url"] === void 0 ? {} : { detailsUrl: options["details-url"] }
      });
      if (!stepCheck.ok) return stepCheck;
    }
    return ok({ kind: "check", check: published.value });
  }
});
async function publishFailure(client, repository2, options) {
  const headSha = requiredOption(options["head"], "--head");
  if (!headSha.ok) return headSha;
  const workflowRunId = requiredOption(options["workflow-run-id"], "--workflow-run-id");
  if (!workflowRunId.ok) return workflowRunId;
  const published = await publishValidationCheck(client, {
    repository: repository2,
    headSha: headSha.value,
    verdict: "failed",
    planIdentity: null,
    workflowRunId: workflowRunId.value,
    summary: `Docket validation could not complete: ${options.failed ?? ""}`,
    ...options["details-url"] === void 0 ? {} : { detailsUrl: options["details-url"] }
  });
  if (!published.ok) return published;
  return ok({ kind: "check", check: published.value });
}
function summarize(run) {
  const failures = run.validation?.failures ?? [];
  if (failures.length === 0) return `Docket validation ${run.status}.`;
  return [`Docket validation ${run.status}:`, ...failures.map((failure) => `- ${failure}`)].join("\n");
}
async function readRunRecord(directory) {
  const run = await readValidationRun(directory);
  return run.ok ? ok({
    plan: run.value.plan,
    status: run.value.validation.verdict,
    validation: run.value.validation,
    steps: run.value.run.steps,
    workflow: run.value.run.workflow
  }) : run;
}

// src/lib/features/github/rollback-pull-request.ts
var SHA2 = /^[0-9a-f]{40}$/;
async function readBranchHead(client, repository2, branch) {
  if (!repositoryName(repository2)) {
    return err(docketError(ErrorCode.rollbackSourceInvalid, "rollback source has an invalid repository name"));
  }
  if (!branchName(branch)) {
    return err(docketError(ErrorCode.rollbackConflict, `cannot use target branch ${JSON.stringify(branch)}`));
  }
  const response = await githubRequest(client, {
    method: "GET",
    path: `/repos/${repository2}/git/ref/heads/${encodeURIComponent(branch)}`
  });
  if (!response.ok) return response;
  const sha = text6(asRecord8(asRecord8(response.value.body)?.["object"])?.["sha"]);
  return sha !== void 0 && SHA2.test(sha) ? ok(sha) : err(docketError(ErrorCode.githubFailed, `GitHub returned no commit for branch \`${branch}\``));
}
async function createCompensatingPullRequest(client, proposal) {
  const { plan } = proposal;
  if (!plan.normalFlow.ready) {
    return err(
      docketError(
        ErrorCode.destructiveNotAllowed,
        `cannot create rollback PR: environment ${plan.target.environmentId} forbids the inverse deletion`
      )
    );
  }
  const current = await readBranchHead(client, plan.source.repository, plan.target.branch);
  if (!current.ok) return current;
  if (current.value !== plan.target.baseSha) {
    return err(
      docketError(
        ErrorCode.rollbackConflict,
        `cannot create rollback PR: branch \`${plan.target.branch}\` moved from ${plan.target.baseSha} to ${current.value}`
      )
    );
  }
  const baseTree = await treeOfCommit(client, plan.source.repository, plan.target.baseSha);
  if (!baseTree.ok) return baseTree;
  const tree = await githubRequest(client, {
    method: "POST",
    path: `/repos/${plan.source.repository}/git/trees`,
    body: {
      base_tree: baseTree.value,
      tree: proposal.files.map(
        (operation) => operation.kind === "delete" ? { path: operation.path, mode: "100644", type: "blob", sha: null } : {
          path: operation.path,
          mode: operation.mode,
          type: "blob",
          content: operation.contents
        }
      )
    }
  });
  if (!tree.ok) return tree;
  const treeSha = responseSha(tree.value.body, "tree");
  if (!treeSha.ok) return treeSha;
  const commit = await githubRequest(client, {
    method: "POST",
    path: `/repos/${plan.source.repository}/git/commits`,
    body: {
      message: plan.title,
      tree: treeSha.value,
      parents: [plan.target.baseSha]
    }
  });
  if (!commit.ok) return commit;
  const commitSha = responseSha(commit.value.body, "commit");
  if (!commitSha.ok) return commitSha;
  const reference = await githubRequest(client, {
    method: "POST",
    path: `/repos/${plan.source.repository}/git/refs`,
    body: { ref: `refs/heads/${plan.branch}`, sha: commitSha.value }
  });
  if (!reference.ok) return reference;
  const referenceRecord = asRecord8(reference.value.body);
  const referenceName = text6(referenceRecord?.["ref"]);
  const referenceSha = text6(asRecord8(referenceRecord?.["object"])?.["sha"]);
  if (referenceName !== `refs/heads/${plan.branch}` || referenceSha !== commitSha.value) {
    return err(docketError(ErrorCode.githubFailed, "GitHub created no matching rollback branch"));
  }
  const pull = await githubRequest(client, {
    method: "POST",
    path: `/repos/${plan.source.repository}/pulls`,
    body: {
      title: plan.title,
      head: plan.branch,
      base: plan.target.branch,
      body: plan.body
    }
  });
  if (!pull.ok) return pull;
  return parsePullRequest(pull.value.body, plan, commitSha.value);
}
async function treeOfCommit(client, repository2, sha) {
  const response = await githubRequest(client, {
    method: "GET",
    path: `/repos/${repository2}/git/commits/${sha}`
  });
  if (!response.ok) return response;
  const tree = asRecord8(asRecord8(response.value.body)?.["tree"]);
  const treeSha = text6(tree?.["sha"]);
  return treeSha !== void 0 && SHA2.test(treeSha) ? ok(treeSha) : err(docketError(ErrorCode.githubFailed, `GitHub returned no tree for commit ${sha}`));
}
function responseSha(body, kind) {
  const sha = text6(asRecord8(body)?.["sha"]);
  return sha !== void 0 && SHA2.test(sha) ? ok(sha) : err(docketError(ErrorCode.githubFailed, `GitHub returned no ${kind} SHA`));
}
function parsePullRequest(body, plan, commitSha) {
  const record = asRecord8(body);
  const number = record?.["number"];
  const url = text6(record?.["html_url"]);
  const state = text6(record?.["state"]);
  const head = asRecord8(record?.["head"]);
  const base = asRecord8(record?.["base"]);
  const headRepository = text6(asRecord8(head?.["repo"])?.["full_name"]);
  if (typeof number !== "number" || !Number.isInteger(number) || number <= 0 || url === void 0 || state !== "open" || text6(head?.["ref"]) !== plan.branch || text6(head?.["sha"]) !== commitSha || headRepository !== plan.source.repository || text6(base?.["ref"]) !== plan.target.branch) {
    return err(docketError(ErrorCode.githubFailed, "GitHub created no readable pull request"));
  }
  return ok({
    number,
    url,
    repository: plan.source.repository,
    branch: plan.branch,
    baseBranch: plan.target.branch,
    baseSha: plan.target.baseSha,
    commitSha,
    rollbackIdentity: plan.identity
  });
}
function asRecord8(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function text6(value) {
  return typeof value === "string" && value !== "" ? value : void 0;
}
function repositoryName(value) {
  return /^[^/\s]+\/[^/\s]+$/.test(value);
}
function branchName(value) {
  return value !== "" && !value.startsWith("-") && !value.startsWith("/") && !value.endsWith("/") && !value.endsWith(".") && !value.endsWith(".lock") && !value.includes("..") && !value.includes("@{") && !value.includes("//") && !/[\u0000-\u0020~^:?*\[\\]/.test(value);
}

// src/lib/features/git/tree.ts
async function readPathAtCommit(cwd, shaInput, path) {
  const sha = parseCommitSha(shaInput, "commit SHA", ErrorCode.gitFailed);
  if (!sha.ok) return sha;
  const safePath = requireRepositoryPath(path);
  if (!safePath.ok) return safePath;
  const listed = await runGit(
    ["ls-tree", "-z", "--full-name", "--end-of-options", sha.value, "--", safePath.value],
    { cwd }
  );
  if (listed.startError !== null || listed.exitCode !== 0) {
    return err(gitFailure(`cannot inspect \`${safePath.value}\` at ${sha.value}`, listed));
  }
  if (listed.stdout === "") return ok({ kind: "absent" });
  const entries = listed.stdout.split("\0").filter((entry) => entry !== "");
  if (entries.length !== 1) {
    return err(
      docketError(
        ErrorCode.gitFailed,
        `cannot inspect \`${safePath.value}\` at ${sha.value}: Git returned ${entries.length} entries`
      )
    );
  }
  const parsed = parseTreeEntry(entries[0] ?? "", safePath.value, sha.value);
  if (!parsed.ok) return parsed;
  const blob = await runGit(["cat-file", "blob", parsed.value.blobSha], { cwd });
  if (blob.startError !== null || blob.exitCode !== 0) {
    return err(gitFailure(`cannot read \`${safePath.value}\` at ${sha.value}`, blob));
  }
  return ok({
    kind: "file",
    mode: parsed.value.mode,
    contents: blob.stdout,
    blobSha: parsed.value.blobSha
  });
}
async function listPathsAtCommit(cwd, shaInput, prefix) {
  const sha = parseCommitSha(shaInput, "commit SHA", ErrorCode.gitFailed);
  if (!sha.ok) return sha;
  const safePrefix = requireRepositoryPath(prefix);
  if (!safePrefix.ok) return safePrefix;
  const listed = await runGit(
    ["ls-tree", "-r", "-z", "--name-only", "--full-name", "--end-of-options", sha.value, "--", safePrefix.value],
    { cwd }
  );
  if (listed.startError !== null || listed.exitCode !== 0) {
    return err(gitFailure(`cannot list \`${safePrefix.value}\` at ${sha.value}`, listed));
  }
  const paths = listed.stdout.split("\0");
  if (paths.at(-1) === "") paths.pop();
  return ok(paths);
}
function parseTreeEntry(entry, expectedPath, sha) {
  const tab = entry.indexOf("	");
  const header = tab < 0 ? "" : entry.slice(0, tab);
  const path = tab < 0 ? "" : entry.slice(tab + 1);
  const [mode, type, blobSha, extra] = header.split(" ");
  if (path !== expectedPath || extra !== void 0 || mode !== "100644" && mode !== "100755" || type !== "blob" || typeof blobSha !== "string" || !/^[0-9a-f]{40}$/.test(blobSha)) {
    return err(
      docketError(
        ErrorCode.gitFailed,
        `cannot inspect \`${expectedPath}\` at ${sha}: it is not one regular Git file`
      )
    );
  }
  return ok({ mode, blobSha });
}
function requireRepositoryPath(path) {
  if (path === "" || path.startsWith("/") || path.endsWith("/") || path.includes("\0") || path.split("/").some((part) => part === "" || part === "." || part === "..")) {
    return err(docketError(ErrorCode.gitFailed, `invalid repository path: ${JSON.stringify(path)}`));
  }
  return ok(path);
}
function gitFailure(prefix, result) {
  return docketError(
    ErrorCode.gitFailed,
    `${prefix}: ${result.startError ?? result.stderr.trim().split("\n")[0] ?? `git exited ${result.exitCode}`}`
  );
}

// src/lib/features/rollback/rollback-plan.ts
var ROLLBACK_PLAN_SCHEMA = "docket.rollback-plan/v1";
function invalidSource(problem) {
  return docketError(ErrorCode.rollbackSourceInvalid, `cannot build rollback: ${problem}`);
}
function conflict(problem) {
  return docketError(ErrorCode.rollbackConflict, `cannot build rollback: ${problem}`);
}

// src/lib/features/rollback/inverse-change.ts
function invertComponents(components) {
  const deployable = [];
  const destructive = [];
  for (const component of components.deployable) {
    if (component.change === "added") {
      destructive.push({ type: component.type, member: component.member, change: "deleted" });
    } else {
      deployable.push({ type: component.type, member: component.member, change: "modified" });
    }
  }
  for (const component of components.destructive) {
    deployable.push({ type: component.type, member: component.member, change: "added" });
  }
  return {
    deployable: deployable.sort(compareComponents),
    destructive: destructive.sort(compareComponents)
  };
}
async function inverseOperations(cwd, baseSha, headSha, sourceRoot, changes) {
  const operations = /* @__PURE__ */ new Map();
  for (const change of changes) {
    const current = classifyPath(change.path, { sourceRoot });
    if (!current.ok) return current;
    if (change.status === "renamed") {
      const previous = classifyPath(change.previousPath, { sourceRoot });
      if (!previous.ok) return previous;
      if (current.value.kind === "component") {
        const added2 = addOperation(operations, {
          kind: "delete",
          path: change.path,
          change: "deleted"
        });
        if (!added2.ok) return added2;
      }
      if (previous.value.kind === "component") {
        const restored2 = await restoreOperation(cwd, baseSha, change.previousPath, "added");
        if (!restored2.ok) return restored2;
        const added2 = addOperation(operations, restored2.value);
        if (!added2.ok) return added2;
      }
      continue;
    }
    if (current.value.kind === "ignored") continue;
    if (change.status === "added") {
      const head = await readPathAtCommit(cwd, headSha, change.path);
      if (!head.ok) return head;
      if (head.value.kind !== "file") {
        return err(invalidSource(`added path \`${change.path}\` is absent at head`));
      }
      const added2 = addOperation(operations, {
        kind: "delete",
        path: change.path,
        change: "deleted"
      });
      if (!added2.ok) return added2;
      continue;
    }
    const restored = await restoreOperation(
      cwd,
      baseSha,
      change.path,
      change.status === "modified" ? "modified" : "added"
    );
    if (!restored.ok) return restored;
    const added = addOperation(operations, restored.value);
    if (!added.ok) return added;
  }
  return ok([...operations.values()].sort((left, right) => compareText(left.path, right.path)));
}
function operationChange(operation) {
  return { status: operation.change, path: operation.path };
}
function publicOperation(operation) {
  return operation.kind === "delete" ? { ...operation, contentDigest: null, mode: null } : {
    kind: operation.kind,
    path: operation.path,
    change: operation.change,
    contentDigest: digestOf(operation.contents),
    mode: operation.mode
  };
}
async function restoreOperation(cwd, baseSha, path, change) {
  const base = await readPathAtCommit(cwd, baseSha, path);
  if (!base.ok) return base;
  if (base.value.kind !== "file") {
    return err(invalidSource(`cannot restore \`${path}\`: it is absent from the source base`));
  }
  return ok({
    kind: "write",
    path,
    change,
    mode: base.value.mode,
    contents: base.value.contents
  });
}
function addOperation(operations, operation) {
  const existing = operations.get(operation.path);
  if (existing === void 0) {
    operations.set(operation.path, operation);
    return ok(void 0);
  }
  if (canonicalJson(existing) === canonicalJson(operation)) return ok(void 0);
  return err(invalidSource(`the inverse asks for two different operations on \`${operation.path}\``));
}

// src/lib/features/rollback/rollback-conflict.ts
async function requireUnchangedComponents(request) {
  const touched = new Set(
    [...request.components.deployable, ...request.components.destructive].map(componentKey)
  );
  const paths = new Set(request.operationPaths);
  for (const sha of [request.sourceHeadSha, request.currentBaseSha]) {
    const listed = await listPathsAtCommit(request.repositoryDirectory, sha, request.sourceRoot);
    if (!listed.ok) return listed;
    for (const path of listed.value) {
      const classified = classifyPath(path, { sourceRoot: request.sourceRoot });
      if (classified.ok && classified.value.kind === "component" && touched.has(componentKey(classified.value.component))) {
        paths.add(path);
      }
    }
  }
  const conflicts = [];
  for (const path of [...paths].sort(compareText)) {
    const before = await readPathAtCommit(request.repositoryDirectory, request.sourceHeadSha, path);
    if (!before.ok) return before;
    const current = await readPathAtCommit(request.repositoryDirectory, request.currentBaseSha, path);
    if (!current.ok) return current;
    if (!samePathState(before.value, current.value)) conflicts.push(path);
  }
  return conflicts.length === 0 ? ok(void 0) : err(conflict(`later commits changed: ${conflicts.map((path) => `\`${path}\``).join(", ")}`));
}
function requireCurrentConfiguration(sourceConfig, sourceEnvironment, currentConfig, currentEnvironment, source) {
  const changes = [];
  if (currentConfig.sourceRoot !== sourceConfig.sourceRoot) changes.push("sourceRoot");
  if (currentEnvironment.branch !== sourceEnvironment.branch) changes.push("target branch");
  if (currentEnvironment.org !== source.plan.target.org) changes.push("Salesforce org reference");
  if (currentEnvironment.id !== source.plan.target.environmentId) changes.push("environment id");
  return changes.length === 0 ? ok(void 0) : err(conflict(`current configuration changed the ${changes.join(", ")}`));
}
function samePathState(left, right) {
  if (left.kind !== right.kind) return false;
  return left.kind === "absent" || right.kind === "file" && left.mode === right.mode && left.blobSha === right.blobSha;
}

// src/lib/features/rollback/rollback-report.ts
function rollbackBranch(source, currentBaseSha) {
  return `docket/rollback-pr${source.plan.source.pullRequest}-${source.plan.source.headSha.slice(0, 8)}-${currentBaseSha.slice(0, 8)}`;
}
function rollbackBody(source, currentBaseSha, operations) {
  const lines = [
    "This compensating pull request was calculated by Docket.",
    "",
    `- Source PR: #${source.plan.source.pullRequest}`,
    `- Source plan: \`${source.plan.identity}\``,
    `- Salesforce deployment: \`${oneLine(source.deployment?.deploymentId ?? "unknown")}\``,
    `- Target base: \`${currentBaseSha}\``,
    "",
    "It must pass the ordinary Docket validation check, be merged manually, and then use the ordinary post-merge deployment workflow.",
    "",
    "File operations:",
    ...operations.map((operation) => `- ${operation.kind} \`${operation.path}\``)
  ];
  return `${lines.join("\n")}
`;
}
function renderRollbackReport(plan) {
  const lines = [
    "# Docket rollback proposal",
    "",
    `- Source pull request: #${plan.source.pullRequest}`,
    `- Source deployment: \`${plan.source.deploymentId}\``,
    `- Target: \`${plan.target.environmentId}\` / \`${plan.target.orgId}\``,
    `- Target base: \`${plan.target.baseSha}\``,
    `- Rollback identity: \`${plan.identity}\``,
    "",
    "## Components",
    "",
    "| Type | Member | Change |",
    "| --- | --- | --- |",
    ...[...plan.components.deployable, ...plan.components.destructive].map(
      (component) => `| ${component.type} | ${component.member} | ${component.change} |`
    ),
    "",
    "## Files",
    "",
    "| Operation | Path | Content |",
    "| --- | --- | --- |",
    ...plan.operations.map(
      (operation) => `| ${operation.kind} | ${operation.path.replaceAll("|", "\\|")} | ${operation.contentDigest ?? "delete"} |`
    ),
    "",
    plan.normalFlow.ready ? "The current environment policy admits this inverse through the normal PR flow." : "Blocked: the inverse deletes metadata, but the current environment policy forbids destructive changes.",
    ""
  ];
  return lines.join("\n");
}
function oneLine(value) {
  return value.replace(/[\r\n]+/g, " ");
}

// src/lib/features/rollback/build-rollback.ts
async function rollbackTargetBranch(repositoryDirectory, sourceRun) {
  const config = await configAt(repositoryDirectory, sourceRun.plan.source.baseSha);
  if (!config.ok) return config;
  const environment = selectEnvironment(config.value, sourceRun.plan.target.environmentId);
  if (!environment.ok) return err(invalidSource(environment.error.message));
  if (environment.value.org !== sourceRun.plan.target.org) {
    return err(invalidSource("the trusted environment names a different Salesforce org"));
  }
  return ok(environment.value.branch);
}
async function buildRollbackProposal(request) {
  const currentBase = parseCommitSha(
    request.currentBaseSha,
    "current target-branch SHA",
    ErrorCode.rollbackConflict
  );
  if (!currentBase.ok) return currentBase;
  const source = request.sourceRun;
  const deploymentId = source.deployment?.deploymentId;
  if (deploymentId === void 0) {
    return err(invalidSource("the selected run has no deployment id"));
  }
  const sourceConfig = await configAt(request.repositoryDirectory, source.plan.source.baseSha);
  if (!sourceConfig.ok) return sourceConfig;
  const sourceEnvironment = selectEnvironment(sourceConfig.value, source.plan.target.environmentId);
  if (!sourceEnvironment.ok) return err(invalidSource(sourceEnvironment.error.message));
  const changes = await readChanges({
    cwd: request.repositoryDirectory,
    baseSha: source.plan.source.baseSha,
    headSha: source.plan.source.headSha
  });
  if (!changes.ok) return changes;
  const verifiedSource = buildPlan({
    source: source.plan.source,
    environment: sourceEnvironment.value,
    orgId: source.plan.target.orgId,
    apiVersion: sourceConfig.value.apiVersion,
    sourceRoot: sourceConfig.value.sourceRoot,
    changes: changes.value
  });
  if (!verifiedSource.ok || canonicalJson(verifiedSource.value.plan) !== canonicalJson(source.plan)) {
    return err(invalidSource("the run plan cannot be reproduced from its exact commits and base configuration"));
  }
  const currentConfig = await configAt(request.repositoryDirectory, currentBase.value);
  if (!currentConfig.ok) return currentConfig;
  const currentEnvironment = selectEnvironment(currentConfig.value, source.plan.target.environmentId);
  if (!currentEnvironment.ok) return err(conflict(currentEnvironment.error.message));
  const compatible = requireCurrentConfiguration(
    sourceConfig.value,
    sourceEnvironment.value,
    currentConfig.value,
    currentEnvironment.value,
    source
  );
  if (!compatible.ok) return compatible;
  const operations = await inverseOperations(
    request.repositoryDirectory,
    source.plan.source.baseSha,
    source.plan.source.headSha,
    sourceConfig.value.sourceRoot,
    changes.value
  );
  if (!operations.ok) return operations;
  if (operations.value.length === 0) {
    return err(invalidSource("the deployment contains no supported metadata change to invert"));
  }
  const noLaterChange = await requireUnchangedComponents({
    repositoryDirectory: request.repositoryDirectory,
    sourceHeadSha: source.plan.source.headSha,
    currentBaseSha: currentBase.value,
    sourceRoot: sourceConfig.value.sourceRoot,
    components: source.plan.components,
    operationPaths: operations.value.map((operation) => operation.path)
  });
  if (!noLaterChange.ok) return noLaterChange;
  const inverseComponents = invertComponents(source.plan.components);
  const operationComponents = collectComponents(operations.value.map(operationChange), {
    sourceRoot: sourceConfig.value.sourceRoot
  });
  if (!operationComponents.ok || canonicalJson(operationComponents.value) !== canonicalJson(inverseComponents)) {
    return err(invalidSource("the source diff does not produce the recorded component inverse"));
  }
  const packageXml = renderPackageXml(inverseComponents.deployable, currentConfig.value.apiVersion);
  const destructiveChangesXml = inverseComponents.destructive.length === 0 ? null : renderPackageXml(inverseComponents.destructive, currentConfig.value.apiVersion);
  const publicOperations = operations.value.map(publicOperation);
  const ready = inverseComponents.destructive.length === 0 || currentEnvironment.value.allowDestructiveChanges;
  const identityInput = {
    sourcePlanIdentity: source.plan.identity,
    sourceDeploymentId: deploymentId,
    currentBaseSha: currentBase.value,
    targetBranch: currentEnvironment.value.branch,
    operations: publicOperations,
    packageXmlDigest: digestOf(packageXml),
    destructiveChangesXmlDigest: destructiveChangesXml === null ? null : digestOf(destructiveChangesXml)
  };
  const plan = {
    schema: ROLLBACK_PLAN_SCHEMA,
    source: {
      repository: source.plan.source.repository,
      pullRequest: source.plan.source.pullRequest,
      baseSha: source.plan.source.baseSha,
      headSha: source.plan.source.headSha,
      planIdentity: source.plan.identity,
      deploymentId
    },
    target: {
      environmentId: source.plan.target.environmentId,
      branch: currentEnvironment.value.branch,
      baseSha: currentBase.value,
      org: source.plan.target.org,
      orgId: source.plan.target.orgId
    },
    branch: rollbackBranch(source, currentBase.value),
    title: `Rollback deployment from PR #${source.plan.source.pullRequest}`,
    body: rollbackBody(source, currentBase.value, publicOperations),
    components: inverseComponents,
    operations: publicOperations,
    packageXml,
    destructiveChangesXml,
    normalFlow: {
      allowDestructiveChanges: currentEnvironment.value.allowDestructiveChanges,
      ready
    },
    identity: digestOf(canonicalJson(identityInput))
  };
  return ok({ plan, files: operations.value, report: renderRollbackReport(plan) });
}
async function configAt(cwd, sha) {
  const file = await readFileAtCommit({ cwd, sha, path: CONFIG_FILE_NAME });
  if (!file.ok) return file;
  return parseConfig(file.value);
}

// src/lib/features/rollback/rollback-artifacts.ts
import { mkdir as mkdir6, writeFile as writeFile6 } from "node:fs/promises";
import { join as join11 } from "node:path";
var ROLLBACK_ARTIFACT_NAMES = {
  plan: "rollback-plan.json",
  packageXml: "package.xml",
  destructiveChangesXml: "destructiveChanges.xml",
  report: "report.md"
};
async function writeRollbackArtifacts(directory, proposal) {
  const files = /* @__PURE__ */ new Map([
    [ROLLBACK_ARTIFACT_NAMES.plan, canonicalJsonFile(proposal.plan)],
    [ROLLBACK_ARTIFACT_NAMES.packageXml, proposal.plan.packageXml],
    [ROLLBACK_ARTIFACT_NAMES.report, proposal.report]
  ]);
  if (proposal.plan.destructiveChangesXml !== null) {
    files.set(ROLLBACK_ARTIFACT_NAMES.destructiveChangesXml, proposal.plan.destructiveChangesXml);
  }
  for (const [name, contents] of files) {
    const finding = findSecrets(contents)[0];
    if (finding !== void 0) {
      return err(
        docketError(
          ErrorCode.secretInArtifact,
          `refusing to write ${name}: it contains a ${finding.rule} on line ${finding.line}`
        )
      );
    }
  }
  await mkdir6(directory, { recursive: true });
  for (const [name, contents] of files) await writeFile6(join11(directory, name), contents, "utf8");
  return ok([...files.keys()].sort(compareText));
}

// src/lib/features/rollback/select-run.ts
import { readFile as readFile5 } from "node:fs/promises";
import { join as join12 } from "node:path";
async function selectRollbackSource(directory) {
  const recorded = await readRecordedRun(directory);
  if (!recorded.ok) return recorded;
  const run = recorded.value.run;
  if (run.kind !== "deploy" && run.kind !== "rollback") {
    return err(invalid3(`run kind \`${run.kind}\` did not change an org`));
  }
  if (run.status !== "passed") {
    return err(invalid3(`run status is \`${run.status}\`, not \`passed\``));
  }
  if (run.deployment === null || run.deployment.success !== true || run.deployment.checkOnly !== false || typeof run.deployment.deploymentId !== "string" || run.deployment.deploymentId === "") {
    return err(invalid3("run has no successful regular Salesforce deployment"));
  }
  const deploymentFile = await readFile5(join12(directory, ARTIFACT_NAMES.deployment), "utf8").catch(
    () => void 0
  );
  if (deploymentFile === void 0) return err(invalid3(`${ARTIFACT_NAMES.deployment} is missing`));
  let deployment;
  try {
    deployment = JSON.parse(deploymentFile);
  } catch {
    return err(invalid3(`${ARTIFACT_NAMES.deployment} is not readable JSON`));
  }
  if (canonicalJson(deployment) !== canonicalJson(run.deployment)) {
    return err(invalid3(`${ARTIFACT_NAMES.deployment} and ${ARTIFACT_NAMES.run} disagree`));
  }
  return ok(run);
}
function invalid3(problem) {
  return docketError(ErrorCode.rollbackSourceInvalid, `cannot start rollback: ${problem}`);
}

// src/lib/features/cli/commands/rollback/rollback-command.ts
var flags11 = flagsFor("run", "repo", "repository", "head", "create-pr", "out", "github-token");
var rollbackCommand = defineCommand({
  name: "rollback",
  summary: "Build or publish a compensating PR for a successful run",
  flags: flags11,
  run: async (options, context) => {
    const directory = requiredOption(options.run, "--run");
    if (!directory.ok) return directory;
    const recorded = absolutePath(directory.value, context.cwd);
    const source = await selectRollbackSource(recorded);
    if (!source.ok) return source;
    if (options.repository !== void 0 && options.repository !== source.value.plan.source.repository) {
      return err(
        docketError(
          ErrorCode.rollbackSourceInvalid,
          `cannot start rollback: --repository is ${options.repository}, but the run belongs to ${source.value.plan.source.repository}`
        )
      );
    }
    const createPullRequest = options["create-pr"] === true;
    if (!createPullRequest && options.head === void 0) {
      return ok({ kind: "rollback-source", run: source.value, directory: recorded });
    }
    if (createPullRequest && options.head !== void 0) {
      return err(
        docketError(
          ErrorCode.invalidOption,
          "--create-pr reads the target branch freshly from GitHub; do not also pass --head"
        )
      );
    }
    const repositoryDirectory = repositoryDirectoryOf(options, context.cwd);
    let currentBaseSha;
    let client;
    if (createPullRequest) {
      client = githubClientOf(options, context);
      if (!client.ok) return client;
      const branch = await rollbackTargetBranch(repositoryDirectory, source.value);
      if (!branch.ok) return branch;
      const current = await readBranchHead(
        client.value,
        source.value.plan.source.repository,
        branch.value
      );
      if (!current.ok) return current;
      currentBaseSha = current.value;
    } else {
      const parsed = parseCommitSha(options.head, "--head", ErrorCode.invalidOption);
      if (!parsed.ok) return parsed;
      currentBaseSha = parsed.value;
    }
    const proposal = await buildRollbackProposal({
      repositoryDirectory,
      sourceRun: source.value,
      currentBaseSha
    });
    if (!proposal.ok) return proposal;
    let outputDirectory = null;
    if (options.out !== void 0) {
      outputDirectory = outputDirectoryOf(options, context.cwd, "rollback");
      const written = await writeRollbackArtifacts(outputDirectory, proposal.value);
      if (!written.ok) return written;
    }
    if (!createPullRequest) {
      return ok({
        kind: "rollback-plan",
        plan: proposal.value.plan,
        report: proposal.value.report,
        directory: outputDirectory
      });
    }
    if (client === void 0 || !client.ok) {
      return err(docketError(ErrorCode.githubFailed, "GitHub client was not initialized"));
    }
    const pullRequest = await createCompensatingPullRequest(client.value, proposal.value);
    if (!pullRequest.ok) return pullRequest;
    return ok({
      kind: "rollback-pr",
      pullRequest: pullRequest.value,
      plan: proposal.value.plan,
      directory: outputDirectory
    });
  }
});

// src/lib/features/audit/state-contract.ts
var STATE_AUDIT_SCHEMA = "docket.state-audit/v1";
var MVP_STATE_AUDIT = {
  schema: STATE_AUDIT_SCHEMA,
  status: "passed-with-limitations",
  database: "none",
  capabilities: [
    { capability: "configuration", backend: "Git docket.yml at an exact base commit" },
    {
      capability: "validation-handoff",
      backend: "immutable GitHub Actions artifact selected by a GitHub Check Run"
    },
    { capability: "merge-gate", backend: "GitHub Check Runs on the exact PR head SHA" },
    {
      capability: "manual-steps",
      backend: "GitHub Check Runs plus immutable completion artifacts"
    },
    {
      capability: "deployment-lock",
      backend: "job-scoped GitHub Actions concurrency group keyed by verified org id"
    },
    { capability: "deployment-history", backend: "verified non-secret run artifacts" },
    {
      capability: "rollback",
      backend: "verified deployment artifact plus Git commits and a compensating GitHub PR"
    }
  ],
  limitations: [
    "GitHub Actions concurrency does not serialize a direct local CLI deployment.",
    "History and rollback are available only while run artifacts are retained or separately exported.",
    "GitHub queue: max admits at most 100 pending deployments in one concurrency group."
  ]
};
function renderStateAudit(audit = MVP_STATE_AUDIT) {
  return [
    "# Docket MVP state audit",
    "",
    `Database: ${audit.database}`,
    `Verdict: ${audit.status}`,
    "",
    ...audit.capabilities.map((entry) => `- ${entry.capability}: ${entry.backend}`),
    "",
    "Known limitations:",
    ...audit.limitations.map((limitation) => `- ${limitation}`),
    ""
  ].join("\n");
}

// src/lib/features/cli/commands/state-audit/state-audit-command.ts
var stateAuditCommand = defineCommand({
  name: "state-audit",
  summary: "Show the no-database MVP runtime-state contract",
  flags: flagsFor(),
  run: () => ok({ kind: "state-audit", audit: MVP_STATE_AUDIT })
});

// src/lib/features/cli/commands/validate/validate-command.ts
import { isAbsolute as isAbsolute4, join as join14 } from "node:path";

// src/lib/features/pipeline/validate-run.ts
import { mkdir as mkdir7, writeFile as writeFile7 } from "node:fs/promises";
import { join as join13 } from "node:path";
async function validateRun(request) {
  const { plan } = request.prepared;
  const manifests = await writeManifests(request.outputDirectory, request.prepared);
  const outcome2 = await withWorkspace(
    { cwd: request.repositoryDirectory, sha: plan.plan.source.headSha },
    async (workspace) => {
      if (request.gates.results.some((step) => step.status !== "passed")) {
        return ok({
          steps: request.gates.results,
          logs: request.gates.logs,
          deployment: null,
          salesforce: "validated"
        });
      }
      if (!planChangesMetadata(plan.plan)) {
        return ok({
          steps: [...request.gates.results, ...manualSteps(plan.plan)],
          logs: request.gates.logs,
          deployment: null,
          salesforce: "not-required"
        });
      }
      const deployment = await runDeployment(
        { ...request.cli, cwd: workspace.directory },
        "validate",
        {
          manifestPath: manifests.packageXml,
          destructivePath: manifests.destructiveChangesXml,
          org: plan.plan.target.org,
          tests: plan.plan.tests,
          waitMinutes: request.waitMinutes
        }
      );
      if (!deployment.ok) return deployment;
      return ok({
        steps: [...request.gates.results, ...manualSteps(plan.plan)],
        logs: request.gates.logs,
        deployment: deployment.value,
        salesforce: "validated"
      });
    }
  );
  if (!outcome2.ok) return outcome2;
  const validation = validationRecordOf({
    plan: plan.plan,
    steps: outcome2.value.steps,
    deployment: outcome2.value.deployment,
    salesforce: outcome2.value.salesforce
  });
  const run = {
    schema: RUN_SCHEMA,
    kind: "validate",
    executor: request.executor,
    status: validation.verdict,
    timing: request.timing,
    plan: plan.plan,
    validation,
    deployment: null,
    steps: outcome2.value.steps,
    workflow: request.workflow ?? null,
    mergeCommit: null,
    artifactsExpireAt: request.artifactsExpireAt ?? null
  };
  const written = await writeRunArtifacts(request.outputDirectory, {
    plan,
    validation,
    run,
    logs: outcome2.value.logs
  });
  if (!written.ok) return written;
  return ok(run);
}
function manualSteps(plan) {
  return plan.steps.preDeployment.flatMap(
    (step) => step.kind === "manual" ? [
      {
        name: step.name,
        kind: "pre",
        manual: true,
        status: "pending",
        exitCode: null,
        completedBy: null
      }
    ] : []
  );
}
async function writeManifests(directory, prepared) {
  await mkdir7(directory, { recursive: true });
  const packageXml = join13(directory, ARTIFACT_NAMES.packageXml);
  await writeFile7(packageXml, prepared.plan.packageXml, "utf8");
  if (prepared.plan.destructiveChangesXml === void 0) {
    return { packageXml, destructiveChangesXml: void 0 };
  }
  const destructiveChangesXml = join13(directory, ARTIFACT_NAMES.destructiveChangesXml);
  await writeFile7(destructiveChangesXml, prepared.plan.destructiveChangesXml, "utf8");
  return { packageXml, destructiveChangesXml };
}

// src/lib/features/cli/commands/validate/validate-command.ts
var flags12 = flagsFor(
  "repo",
  "repository",
  "pull-request",
  "base",
  "head",
  "environment",
  "target-branch",
  "org-id",
  "sf",
  "wait",
  "gates-run",
  "out",
  "workflow-run-id",
  "workflow-run-attempt",
  "artifacts-expire-at",
  "github-token"
);
var validateCommand = defineCommand({
  name: "validate",
  summary: "Validate that plan against the configured org",
  flags: flags12,
  run: async (options, context) => {
    const source = await resolveSource(options, context);
    if (!source.ok) return source;
    const environment = requiredOption(options.environment, "--environment");
    if (!environment.ok) return environment;
    const waitMinutes = waitMinutesOf(options);
    if (!waitMinutes.ok) return waitMinutes;
    const execution = executionOf(options);
    if (!execution.ok) return execution;
    const artifactsExpireAt = artifactsExpireAtOf(options);
    if (!artifactsExpireAt.ok) return artifactsExpireAt;
    const repositoryDirectory = repositoryDirectoryOf(options, context.cwd);
    const startedAt = context.now().toISOString();
    const prepared = await prepareRun(
      {
        repositoryDirectory,
        source: source.value.source,
        environmentId: environment.value,
        targetBranch: source.value.targetBranch
      },
      orgResolverOf(options, repositoryDirectory)
    );
    if (!prepared.ok) return prepared;
    let gates = { results: [], logs: [] };
    if (prepared.value.environment.gates.length > 0 || options["gates-run"] !== void 0) {
      const directory = requiredOption(options["gates-run"], "--gates-run");
      if (!directory.ok) return directory;
      const verified = await readPassedGateRun(
        isAbsolute4(directory.value) ? directory.value : join14(context.cwd, directory.value),
        {
          source: source.value.source,
          environment: prepared.value.environment,
          targetBranch: source.value.targetBranch ?? prepared.value.environment.branch
        }
      );
      if (!verified.ok) return verified;
      gates = verified.value;
    }
    const run = await validateRun({
      prepared: prepared.value,
      repositoryDirectory,
      outputDirectory: outputDirectoryOf(options, context.cwd, "validate"),
      cli: { executable: sfExecutableOf(options), timeoutMs: timeoutMsOf(waitMinutes.value) },
      waitMinutes: waitMinutes.value,
      executor: execution.value.executor,
      timing: { startedAt, finishedAt: context.now().toISOString() },
      gates,
      ...execution.value.workflow === void 0 ? {} : { workflow: execution.value.workflow },
      ...artifactsExpireAt.value === void 0 ? {} : { artifactsExpireAt: artifactsExpireAt.value }
    });
    if (!run.ok) return run;
    return ok({
      kind: "run",
      run: run.value,
      directory: outputDirectoryOf(options, context.cwd, "validate")
    });
  }
});

// src/lib/features/cli/commands/registry.ts
var COMMANDS = [
  changesCommand,
  planCommand,
  gatesCommand,
  validateCommand,
  deployCommand,
  publishCheckCommand,
  locateRunCommand,
  locateStepsCommand,
  completeStepCommand,
  inspectRunCommand,
  rollbackCommand,
  historyCommand,
  stateAuditCommand
];
var BY_NAME = new Map(COMMANDS.map((command) => [command.name, command]));
function commandNamed(name) {
  return BY_NAME.get(name);
}

// src/lib/features/cli/help.ts
function helpText() {
  return [
    `${PRODUCT_NAME} \u2014 code-first deployment pipelines for Salesforce`,
    "",
    `Usage: ${PRODUCT_NAME} <command> [options]`,
    "",
    "Commands:",
    ...COMMANDS.map((command) => `  ${command.name.padEnd(commandWidth())}  ${command.summary}`),
    "",
    "Options:",
    ...flagLines(GLOBAL_FLAGS),
    "",
    `Run \`${PRODUCT_NAME} <command> --help\` for the options that command takes.`,
    ""
  ].join("\n");
}
function commandHelpText(command) {
  return [
    `${PRODUCT_NAME} ${command.name} \u2014 ${command.summary}`,
    "",
    `Usage: ${PRODUCT_NAME} ${command.name} [options]`,
    "",
    ...Object.keys(command.flags).length === 0 ? ["This command takes no options of its own."] : ["Options:", ...flagLines(command.flags)],
    "",
    "Global options:",
    ...flagLines(GLOBAL_FLAGS),
    ""
  ].join("\n");
}
function commandWidth() {
  return Math.max(...COMMANDS.map((command) => command.name.length));
}
function flagLines(flags13) {
  const entries = Object.entries(flags13);
  const width = Math.max(...entries.map(([name, spec]) => flagLabel(name, spec).length));
  return entries.map(([name, spec]) => `  ${flagLabel(name, spec).padEnd(width)}  ${spec.description}`);
}
function flagLabel(name, spec) {
  return `${spec.short === void 0 ? "    " : `-${spec.short}, `}--${name}`;
}

// src/lib/features/cli/parse-invocation.ts
import { parseArgs } from "node:util";
function commandNameOf(argv) {
  for (const [index, argument] of argv.entries()) {
    if (argument === "--") return argv[index + 1];
    if (!argument.startsWith("-")) return argument;
  }
  return void 0;
}
function parseInvocation(argv, flags13, command) {
  let parsed;
  try {
    parsed = parseArgs({
      args: [...argv],
      options: parseOptionsOf(flags13),
      allowPositionals: true,
      strict: true
    });
  } catch (error) {
    return err(docketError(ErrorCode.invalidOption, optionProblem(error, command)));
  }
  const extra = parsed.positionals[command === void 0 ? 0 : 1];
  if (extra !== void 0) {
    return err(docketError(ErrorCode.invalidOption, `unexpected argument: ${extra}`));
  }
  return ok(parsed.values);
}
function parseOptionsOf(flags13) {
  return Object.fromEntries(
    Object.entries(flags13).map(([name, spec]) => [
      name,
      spec.short === void 0 ? { type: spec.type } : { type: spec.type, short: spec.short }
    ])
  );
}
function optionProblem(error, command) {
  const message2 = error instanceof Error ? error.message : String(error);
  const unknown = error instanceof Error && "code" in error && error.code === "ERR_PARSE_ARGS_UNKNOWN_OPTION" ? /'(-{1,2}[^']+)'/.exec(message2)?.[1] : void 0;
  if (unknown === void 0) return message2.split(". ")[0] ?? message2;
  return command === void 0 ? `unknown option: ${unknown}` : `unknown option for \`${command}\`: ${unknown}`;
}

// src/lib/features/cli/exit-code.ts
var ExitCode = {
  /** The command did what was asked. */
  success: 0,
  /** The command ran but its subject failed (a gate, a validation, a deploy). */
  failure: 1,
  /** The invocation itself was wrong: unknown command, bad flag, bad input. */
  usage: 2
};

// src/lib/features/cli/render.ts
var EXIT_BY_ERROR_CODE = {
  unknown_command: ExitCode.usage,
  invalid_option: ExitCode.usage,
  missing_option: ExitCode.usage,
  // The rest describe a subject Docket was asked about, not a mistyped
  // invocation: the run started and the answer is that it cannot proceed.
  git_failed: ExitCode.failure,
  unsupported_change: ExitCode.failure,
  unsupported_metadata: ExitCode.failure,
  invalid_config: ExitCode.failure,
  unknown_environment: ExitCode.usage,
  branch_mismatch: ExitCode.failure,
  destructive_not_allowed: ExitCode.failure,
  salesforce_failed: ExitCode.failure,
  org_unavailable: ExitCode.failure,
  org_mismatch: ExitCode.failure,
  secret_in_artifact: ExitCode.failure,
  plan_mismatch: ExitCode.failure,
  validation_not_passed: ExitCode.failure,
  github_failed: ExitCode.failure,
  pull_request_not_eligible: ExitCode.failure,
  step_incomplete: ExitCode.failure,
  step_already_completed: ExitCode.failure,
  rollback_source_invalid: ExitCode.failure,
  rollback_conflict: ExitCode.failure,
  history_invalid: ExitCode.failure
};
function render(result, format) {
  return format === "json" ? renderJson(result) : renderText(result);
}
function exitCodeOf(data) {
  return (data.kind === "run" || data.kind === "gate-run") && data.run.status === "failed" ? ExitCode.failure : ExitCode.success;
}
function renderJson(result) {
  if (result.ok) {
    return {
      stdout: encode({ ok: true, data: result.value }),
      stderr: "",
      exitCode: exitCodeOf(result.value)
    };
  }
  const { code, message: message2 } = result.error;
  return {
    stdout: encode({ ok: false, error: { code, message: message2 } }),
    stderr: "",
    exitCode: EXIT_BY_ERROR_CODE[code]
  };
}
function renderText(result) {
  if (result.ok) {
    return { stdout: humanText(result.value), stderr: "", exitCode: exitCodeOf(result.value) };
  }
  return {
    stdout: "",
    stderr: `${PRODUCT_NAME}: ${result.error.message}
Run \`${PRODUCT_NAME} --help\` for usage.
`,
    exitCode: EXIT_BY_ERROR_CODE[result.error.code]
  };
}
function humanText(data) {
  switch (data.kind) {
    case "help":
      return data.usage;
    case "version":
      return `${data.version}
`;
    case "changes":
      return changeLines(data.changes);
    case "plan":
      return data.report;
    case "gate-run":
      return `gates ${data.run.status}: ${data.run.source.repository} #${data.run.source.pullRequest}
artifacts  ${data.directory}
`;
    case "run":
      return runSummary(data);
    case "recorded-run":
      return runSummary(data);
    case "check":
      return `${data.check.name} ${data.check.conclusion} for ${data.check.headSha}
`;
    case "originating-run":
      return `${data.originating.workflowRunId}
`;
    case "step-origins":
      return data.origins.map((origin) => `${origin.workflowRunId}
`).join("");
    case "step-completed":
      return `${data.completion.step} completed by ${data.completion.completedBy}
${data.path}
`;
    case "rollback-source":
      return `rollback source ${data.run.deployment?.deploymentId ?? "unknown"}
${data.directory}
`;
    case "rollback-plan":
      return `${data.report}${data.directory === null ? "" : `artifacts  ${data.directory}
`}`;
    case "rollback-pr":
      return `rollback PR #${data.pullRequest.number}: ${data.pullRequest.url}
branch     ${data.pullRequest.branch}
${data.directory === null ? "" : `artifacts  ${data.directory}
`}`;
    case "history":
      return `${renderDeploymentHistory(data.history)}${data.directory === null ? "" : `artifacts  ${data.directory}
`}`;
    case "state-audit":
      return renderStateAudit(data.audit);
  }
}
function changeLines(changes) {
  if (changes.length === 0) return "No changes between the two commits.\n";
  return changes.map(
    (change) => change.status === "renamed" ? `renamed  ${change.previousPath} -> ${change.path}
` : `${change.status.padEnd(8)} ${change.path}
`
  ).join("");
}
function runSummary(data) {
  const { run } = data;
  const lines = [
    `${run.kind} ${run.status}: ${run.plan.source.repository} #${run.plan.source.pullRequest} -> ${run.plan.target.environmentId}`,
    `head       ${run.plan.source.headSha}`,
    `org        ${run.plan.target.org} (${run.plan.target.orgId})`
  ];
  if (run.deployment !== null) lines.push(`salesforce ${run.deployment.deploymentId}`);
  for (const failure of run.validation?.failures ?? []) lines.push(`failed     ${failure}`);
  lines.push(`artifacts  ${data.directory}`);
  return `${lines.join("\n")}
`;
}
function encode(payload) {
  return `${JSON.stringify(payload)}
`;
}

// src/lib/features/cli/cli.ts
async function runCli(argv, context) {
  return render(await execute(argv, context), formatOf(argv));
}
function formatOf(argv) {
  return argv.includes("--json") ? "json" : "text";
}
async function execute(argv, context) {
  const name = commandNameOf(argv);
  if (name === void 0) {
    const globals = parseInvocation(argv, GLOBAL_FLAGS, void 0);
    if (!globals.ok) return globals;
    return globals.value["version"] === true ? versionOf(context) : ok({ kind: "help", usage: helpText() });
  }
  const command = commandNamed(name);
  if (command === void 0) {
    return err(docketError(ErrorCode.unknownCommand, `unknown command: ${name}`));
  }
  const parsed = parseInvocation(argv, { ...command.flags, ...GLOBAL_FLAGS }, command.name);
  if (!parsed.ok) return parsed;
  if (parsed.value["help"] === true) return ok({ kind: "help", usage: commandHelpText(command) });
  if (parsed.value["version"] === true) return versionOf(context);
  return command.run(parsed.value, context);
}
function versionOf(context) {
  return ok({ kind: "version", name: PRODUCT_NAME, version: context.version });
}

// src/bin/docket.ts
var version = true ? "0.1.0" : JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8")).version;
var outcome = await runCli(process.argv.slice(2), {
  version,
  cwd: process.cwd(),
  env: process.env,
  now: () => /* @__PURE__ */ new Date()
});
if (outcome.stdout !== "") process.stdout.write(outcome.stdout);
if (outcome.stderr !== "") process.stderr.write(outcome.stderr);
process.exitCode = outcome.exitCode;

// docket 0.1.0
