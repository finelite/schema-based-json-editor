import * as toNumber from "lodash.tonumber";
import * as toInteger from "lodash.tointeger";
import * as isObject from "lodash.isobject";
import * as isInteger from "lodash.isinteger";
import { defaultLocale as defaultMarkDownTipLocale } from "markdown-tip/common";
export { toNumber, toInteger };

import { __extends, __decorate, __assign } from "tslib";
(window as any).__extends = __extends;
(window as any).__decorate = __decorate;
(window as any).__assign = __assign;

export type CommonSchema = {
    $schema?: string;
    title?: string;
    description?: string;
    default?: ValueType;
    readonly?: boolean;
    propertyOrder?: number;
};

export type ObjectSchema = CommonSchema & {
    type: "object";
    properties: { [name: string]: Schema };
    required?: string[];
    maxProperties?: number;
    minProperties?: number;
    collapsed?: boolean;
};

export type ArraySchema = CommonSchema & {
    type: "array";
    items: Schema;
    minItems?: number;
    uniqueItems?: boolean;
    collapsed?: boolean;
};

export type NumberSchema = CommonSchema & {
    type: "number" | "integer";
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: number;
    exclusiveMaximum?: boolean;
    enum?: number[];
    multipleOf?: number;
};

export type StringSchema = CommonSchema & {
    type: "string";
    format?: "textarea" | "color" | "date" | "datetime" | "datetime-local" | "time" | "month" | "email" | "uri" | "url" | "week" | "hostname" | "ipv4" | "ipv6" | "code" | "markdown";
    enum?: string[];
    minLength?: number;
    maxLength?: number;
    pattern?: string;
};

export type BooleanSchema = CommonSchema & {
    type: "boolean";
};

export type NullSchema = CommonSchema & {
    type: "null";
};

export type Schema = ObjectSchema | ArraySchema | NumberSchema | StringSchema | BooleanSchema | NullSchema;

export const themes: { [name: string]: Theme } = {
    bootstrap3: {
        rowContainer: "well bootstrap3-row-container",
        row: "row",
        formControl: "form-control",
        button: "btn btn-default",
        help: "help-block",
        errorRow: "row has-error",
        label: "control-label",
        optionalCheckbox: "checkbox pull-left",
        buttonGroup: "btn-group",
        radiobox: "radio-inline",
    },
};

export const defaultTheme = {
    rowContainer: "",
    row: "",
    formControl: "",
    button: "",
    help: "",
    errorRow: "",
    label: "",
    optionalCheckbox: "",
    buttonGroup: "",
    radiobox: "",
};

export type Theme = typeof defaultTheme;

export function getTheme(name: string | undefined | Theme): Theme {
    if (name === undefined) {
        return defaultTheme;
    }
    if (typeof name === "string") {
        return themes[name] || defaultTheme;
    }
    return name;
}

export const defaultLocale = {
    button: {
        collapse: "Collapse",
        expand: "Expand",
        add: "Add",
        delete: "Delete",
    },
    error: {
        minLength: "Value must be at least {0} characters long.",
        maxLength: "Value must be at most {0} characters long.",
        pattern: "Value doesn't match the pattern {0}.",
        minimum: "Value must be >= {0}.",
        maximum: "Value must be <= {0}.",
        largerThan: "Value must be > {0}.",
        smallerThan: "Value must be < {0}.",
        minItems: "The length of the array must be >= {0}.",
        uniqueItems: "The item in {0} and {1} must not be same.",
        multipleOf: "Value must be multiple value of {0}.",
        minProperties: "Properties count must be >= {0}.",
        maxProperties: "Properties count must be <= {0}.",
    },
    info: {
        notExists: "not exists",
        true: "true",
        false: "false",
    },
    markdownTipLocale: defaultMarkDownTipLocale,
};

export type Locale = typeof defaultLocale;

export const locales: { [name: string]: Locale } = {};

export function getLocale(locale: undefined | null | Locale): Locale {
    return locale || defaultLocale;
}

export const bootstrap3Icon = {
    isText: false,
    collapse: "glyphicon glyphicon-chevron-down",
    expand: "glyphicon glyphicon-chevron-right",
    add: "glyphicon glyphicon-plus",
    delete: "glyphicon glyphicon-remove",
};

export type Icon = typeof bootstrap3Icon;

const icons: { [name: string]: Icon } = {
    bootstrap3: bootstrap3Icon,
    fontawesome4: {
        isText: false,
        collapse: "fa fa-caret-square-o-down",
        expand: "fa fa-caret-square-o-right",
        add: "fa fa-plus",
        delete: "fa fa-times",
    },
};

export function getIcon(name: string | undefined | Icon, locale: Locale): Icon {
    if (name === undefined) {
        return {
            isText: true,
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    if (typeof name === "string") {
        return icons[name] || {
            isText: true,
            collapse: locale.button.collapse,
            expand: locale.button.expand,
            add: locale.button.add,
            delete: locale.button.delete,
        };
    }
    return name;
}

export type ValueType = { [name: string]: any } | any[] | number | boolean | string | null;

export function getDefaultValue(required: boolean | undefined, schema: Schema, initialValue: ValueType | undefined): ValueType | undefined {
    if (initialValue !== undefined) {
        switch (schema.type) {
            case "object":
                if (isObject(initialValue)) {
                    return initialValue;
                }
                break;
            case "array":
                if (Array.isArray(initialValue)) {
                    return initialValue;
                }
                break;
            case "number":
            case "integer":
                if (typeof initialValue === "number") {
                    return initialValue;
                }
                break;
            case "boolean":
                if (typeof initialValue === "boolean") {
                    return initialValue;
                }
                break;
            case "string":
                if (typeof initialValue === "string") {
                    return initialValue;
                }
                break;
            case "null":
            default:
                if (initialValue === null) {
                    return initialValue;
                }
        }
    }

    if (!required) {
        return undefined;
    }

    if (schema.default !== undefined) {
        switch (schema.type) {
            case "object":
                if (isObject(schema.default)) {
                    return schema.default;
                }
                break;
            case "array":
                if (Array.isArray(schema.default)) {
                    return schema.default;
                }
                break;
            case "number":
            case "integer":
                if (typeof schema.default === "number") {
                    return schema.default;
                }
                break;
            case "boolean":
                if (typeof schema.default === "boolean") {
                    return schema.default;
                }
                break;
            case "string":
                if (typeof schema.default === "string") {
                    return schema.default;
                }
                break;
            case "null":
            default:
                if (schema.default === null) {
                    return schema.default;
                }
        }
    }

    switch (schema.type) {
        case "object":
            return {};
        case "array":
            return [];
        case "number":
        case "integer":
            if (schema.enum !== undefined && schema.enum.length > 0) {
                return schema.enum[0];
            } else {
                return 0;
            }
        case "boolean":
            return false;
        case "string":
            if (schema.enum !== undefined && schema.enum.length > 0) {
                return schema.enum[0];
            } else {
                return "";
            }
        case "null":
        default:
            return null;
    }
}

export const buttonGroupStyle = { marginLeft: "10px" };
export const buttonGroupStyleString = "margin-left: 10px";

import { HLJS, Dragula, MarkdownIt, Token, TokenRender, Renderer, MarkdownItType } from "./libs";

export type Props<TSchema extends CommonSchema, TValue> = {
    schema: TSchema;
    initialValue: TValue;
    title?: string;
    updateValue: (value: TValue | undefined, isValid: boolean) => void;
    theme: Theme;
    icon: Icon;
    locale: Locale;
    onDelete?: () => void;
    readonly?: boolean;
    required?: boolean;
    dragula?: Dragula;
    md?: MarkdownIt;
    hljs?: HLJS;
    forceHttps?: boolean;
};

export function isSame(value1: ValueType, value2: ValueType) {
    if (typeof value1 === "string"
        || typeof value1 === "number"
        || typeof value1 === "boolean"
        || value1 === null
        || value1 === undefined) {
        return value1 === value2;
    }
    if (typeof value2 === "string"
        || typeof value2 === "number"
        || typeof value2 === "boolean"
        || value2 === null
        || value2 === undefined) {
        return false;
    }
    if (Array.isArray(value1)) {
        if (Array.isArray(value2) && (value1 as ValueType[]).length === (value2 as ValueType[]).length) {
            for (let i = 0; i < (value1 as ValueType[]).length; i++) {
                if (!isSame((value1 as ValueType[])[i], (value2 as ValueType[])[i])) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    if (Array.isArray(value2)
        || Object.keys((value1 as { [name: string]: ValueType })).length !== Object.keys((value1 as { [name: string]: ValueType })).length) {
        return false;
    }
    for (const key in value1) {
        if (!isSame((value1 as { [name: string]: ValueType })[key], (value2 as { [name: string]: ValueType })[key])) {
            return false;
        }
    }
    return true;
}

export function switchItem(value: any[], el: HTMLElement, sibling: HTMLElement | null) {
    const fromIndex = +el.dataset.index!;
    if (sibling) {
        const toIndex = +sibling.dataset.index!;
        value.splice(toIndex, 0, value[fromIndex]);
        if (fromIndex > toIndex) {
            value.splice(fromIndex + 1, 1);
        } else {
            value.splice(fromIndex, 1);
        }
    } else {
        value.push(value[fromIndex]);
        value.splice(fromIndex, 1);
    }
}

export function getErrorMessageOfArray(value: any[] | undefined, schema: ArraySchema, locale: Locale) {
    if (value !== undefined) {
        if (schema.minItems !== undefined) {
            if (value.length < schema.minItems) {
                return locale.error.minItems.replace("{0}", String(schema.minItems));
            }
        }
        if (schema.uniqueItems) {
            for (let i = 1; i < value.length; i++) {
                for (let j = 0; j < i; j++) {
                    if (isSame(value[i], value[j])) {
                        return locale.error.uniqueItems.replace("{0}", String(j)).replace("{1}", String(i));
                    }
                }
            }
        }
    }
    return "";
}

export function getErrorMessageOfNumber(value: number | undefined, schema: NumberSchema, locale: Locale) {
    if (value !== undefined) {
        if (schema.minimum !== undefined) {
            if (schema.exclusiveMinimum) {
                if (value <= schema.minimum) {
                    return locale.error.largerThan.replace("{0}", String(schema.minimum));
                }
            } else {
                if (value < schema.minimum) {
                    return locale.error.minimum.replace("{0}", String(schema.minimum));
                }
            }
        }
        if (schema.maximum !== undefined) {
            if (schema.exclusiveMaximum) {
                if (value >= schema.maximum) {
                    return locale.error.smallerThan.replace("{0}", String(schema.maximum));
                }
            } else {
                if (value > schema.maximum) {
                    return locale.error.maximum.replace("{0}", String(schema.maximum));
                }
            }
        }
        if (schema.multipleOf && schema.multipleOf > 0) {
            if (!isInteger(value / schema.multipleOf)) {
                return locale.error.multipleOf.replace("{0}", String(schema.multipleOf));
            }
        }
    }
    return "";
}

export function getErrorMessageOfString(value: string | undefined, schema: StringSchema, locale: Locale) {
    if (value !== undefined) {
        if (schema.minLength !== undefined
            && value.length < schema.minLength) {
            return locale.error.minLength.replace("{0}", String(schema.minLength));
        }
        if (schema.maxLength !== undefined
            && value.length > schema.maxLength) {
            return locale.error.maxLength.replace("{0}", String(schema.maxLength));
        }
        if (schema.pattern !== undefined
            && !new RegExp(schema.pattern).test(value)) {
            return locale.error.pattern.replace("{0}", String(schema.pattern));
        }
    }
    return "";
}

export function getErrorMessageOfObject(value: { [name: string]: ValueType } | undefined, schema: ObjectSchema, locale: Locale) {
    if (value !== undefined) {
        let length = 0;
        for (const key in value) {
            if (value[key] !== undefined) {
                length++;
            }
        }
        if (schema.minProperties !== undefined
            && length < schema.minProperties) {
            return locale.error.minProperties.replace("{0}", String(schema.minProperties));
        }
        if (schema.maxProperties !== undefined
            && length > schema.maxProperties) {
            return locale.error.maxProperties.replace("{0}", String(schema.maxProperties));
        }
    }
    return "";
}

export function toggleOptional(value: ValueType | undefined, schema: Schema, initialValue: any) {
    if (value === undefined) {
        return getDefaultValue(true, schema, initialValue);
    } else {
        return undefined;
    }
}

export type ValidityValue<T> = {
    value: T;
    isValid: boolean;
};

export function recordInvalidPropertiesOfObject(invalidProperties: string[], isValid: boolean, property: string) {
    const index = invalidProperties.indexOf(property);
    if (isValid) {
        if (index !== -1) {
            invalidProperties.splice(index, 1);
        }
    } else {
        if (index === -1) {
            invalidProperties.push(property);
        }
    }
}

export function recordInvalidIndexesOfArray(invalidIndexes: number[], isValid: boolean, i: number) {
    const index = invalidIndexes.indexOf(i);
    if (isValid) {
        if (index !== -1) {
            invalidIndexes.splice(index, 1);
        }
    } else {
        if (index === -1) {
            invalidIndexes.push(i);
        }
    }
}

const imageExtensions = [".png", ".jpg", ".bmp", ".gif"];

export function isImageUrl(value?: string) {
    if (!value || value.length <= "https://".length) {
        return false;
    }
    if (value.substr(0, "http://".length) !== "http://"
        && value.substr(0, "https://".length) !== "https://") {
        return false;
    }
    const extensionName = value.substr(value.length - 4, 4);
    return imageExtensions.indexOf(extensionName) !== -1;
}

export function replaceProtocal(src: string) {
    if (src.indexOf("http://") === 0 && src.indexOf("http://localhost") !== 0) {
        return "https://" + src.substring("http://".length);
    }
    return src;
}

export const imagePreviewStyleString = "display: block; height: auto; margin: 6px 0; max-width: 100%;";
export const imagePreviewStyle = {
    display: "block",
    height: "auto",
    margin: "6px 0",
    maxWidth: "100%",
};

function print(message: string) {
    // tslint:disable-next-line:no-console
    console.log(message);
}

export function initializeMarkdown(markdownit: MarkdownItType, hljs: HLJS | undefined, forceHttps: boolean | undefined) {
    if (!markdownit) {
        return undefined;
    }
    const md = markdownit({
        linkify: true,
        highlight: (str: string, lang: string) => {
            if (hljs) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    } catch (error) {
                        print(error);
                    }
                }
                try {
                    return hljs.highlightAuto(str).value;
                } catch (error) {
                    print(error);
                }
            }
            return "";
        },
    });

    md.renderer.rules.image = (tokens: Token[], index: number, options: any, env: any, self: Renderer) => {
        const token = tokens[index];
        const aIndex = token.attrIndex("src");
        if (forceHttps) {
            token.attrs[aIndex][1] = replaceProtocal(token.attrs[aIndex][1]);
        }
        token.attrPush(["style", imagePreviewStyleString]);

        return md.renderer.rules.image(tokens, index, options, env, self);
    };

    let defaultLinkRender: TokenRender;
    if (md.renderer.rules.link_open) {
        defaultLinkRender = md.renderer.rules.link_open;
    } else {
        defaultLinkRender = (tokens: Token[], index: number, options: any, env: any, self: Renderer) => {
            return self.renderToken(tokens, index, options);
        };
    }
    md.renderer.rules.link_open = (tokens: Token[], index: number, options: any, env: any, self: Renderer) => {
        tokens[index].attrPush(["target", "_blank"]);
        tokens[index].attrPush(["rel", "nofollow"]);
        return defaultLinkRender(tokens, index, options, env, self);
    };
    return md;
}

export function findTitle(value: { [name: string]: ValueType } | undefined, properties: { property: string; schema: Schema }[]) {
    if (value) {
        for (const { property } of properties) {
            const title = value[property];
            if (typeof title === "string" && title.length > 0) {
                if (title.length > 23) {
                    return title.substring(0, 20) + "...";
                }
                return title;
            } else {
                continue;
            }
        }
    }
    return undefined;
}

function findTitleFromSchema(value: { [name: string]: ValueType } | undefined, schema: ObjectSchema) {
    if (value) {
        for (const property in schema.properties) {
            if (schema.properties.hasOwnProperty(property)) {
                const title = value[property];
                if (typeof title === "string" && title.length > 0) {
                    if (title.length > 23) {
                        return title.substring(0, 20) + "...";
                    }
                    return title;
                } else {
                    continue;
                }
            }
        }
    }
    return undefined;
}

export function getTitle(...titles: any[]) {
    for (const title of titles) {
        if (title === undefined || title === null) {
            continue;
        }
        return String(title);
    }
    return "";
}

export function compare(a: { property: string; schema: Schema }, b: { property: string; schema: Schema }) {
    if (typeof a.schema.propertyOrder === "number") {
        if (typeof b.schema.propertyOrder === "number") {
            return a.schema.propertyOrder - b.schema.propertyOrder;
        }
        return -1;
    }
    if (typeof b.schema.propertyOrder === "number") {
        return 1;
    }
    return 0;
}

export function filterObject({ property, schema }: { property: string; schema: Schema }, filterValue: string): boolean {
    return filterValue === ""
        || property.indexOf(filterValue) !== -1
        || (!!schema.title && schema.title.indexOf(filterValue) !== -1)
        || (!!schema.description && schema.description.indexOf(filterValue) !== -1);
}

export function filterArray(value: ValueType, index: number, schema: Schema, filterValue: string): boolean {
    const result = filterValue === ""
        || String(index).indexOf(filterValue) !== -1
        || (schema.type === "string" && (value as string).indexOf(filterValue) !== -1)
        || ((schema.type === "number" || schema.type === "integer") && String(value as number).indexOf(filterValue) !== -1);
    if (result) {
        return true;
    }
    if (schema.type === "object") {
        const title = getTitle(findTitleFromSchema(value as { [name: string]: ValueType }, schema as ObjectSchema), schema.title);
        return title.indexOf(filterValue) !== -1;
    }
    return false;
}

export const minItemCountIfNeedFilter = 6;
