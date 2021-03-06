import * as React from "react";
import * as common from "../common";
import { Icon } from "./icon";
import { Optional } from "./optional";
import { Description } from "./description";
import { MarkdownTip } from "markdown-tip/react";
import { Select2 } from "select2-component/react";

export type Props = common.Props<common.StringSchema, string>;
export type State = Partial<{
    value: string;
    errorMessage: string;
    collapsed: boolean;
    willRender: boolean;
}>;

export class StringEditor extends React.Component<Props, State> {
    value?: string;
    errorMessage: string;
    collapsed = false;
    willRender = false;
    constructor(props: Props) {
        super(props);
        this.value = common.getDefaultValue(this.props.required, this.props.schema, this.props.initialValue) as string;
        this.validate();
    }
    onChange = (e: React.FormEvent<{ value: string }>) => {
        this.value = e.currentTarget.value;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    componentDidMount() {
        this.props.updateValue(this.value, !this.errorMessage);
    }
    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (this.willRender) {
            this.willRender = false;
            return true;
        }
        return this.props.initialValue !== nextProps.initialValue;
    }
    render() {
        const textarea = this.useTextArea ? (
            <textarea className={this.props.theme.formControl}
                onChange={this.onChange}
                defaultValue={this.value}
                rows={10}
                readOnly={this.isReadOnly}
                disabled={this.isReadOnly} >
            </textarea>
        ) : null;

        const input = this.useInput ? (
            <input className={this.props.theme.formControl}
                type={this.props.schema.format}
                onChange={this.onChange}
                defaultValue={this.value}
                readOnly={this.isReadOnly}
                disabled={this.isReadOnly} />
        ) : null;

        const select = this.useSelect ? (
            <Select2 data={this.options}
                value={this.value}
                update={(e: string) => this.updateSelection(e)}>
            </Select2>
        ) : null;

        const imagePreview = this.willPreviewImage ? <img style={common.imagePreviewStyle} src={this.getImageUrl} /> : null;

        const markdownTip = this.useTextArea && this.willPreviewMarkdown ? <MarkdownTip locale={this.props.locale.markdownTipLocale}></MarkdownTip> : null;
        const markdownPreview = this.willPreviewMarkdown ? <div dangerouslySetInnerHTML={{ __html: this.getMarkdown }}></div> : null;

        const codePreview = this.willPreviewCode ? <pre><code dangerouslySetInnerHTML={{ __html: this.getCode }}></code></pre> : null;

        return (
            <div className={this.errorMessage ? this.props.theme.errorRow : this.props.theme.row}>
                <label className={this.props.theme.label}>
                    {this.titleToShow}
                    <div className={this.props.theme.buttonGroup} style={common.buttonGroupStyle}>
                        <Optional required={this.props.required}
                            value={this.value}
                            isReadOnly={this.isReadOnly}
                            theme={this.props.theme}
                            locale={this.props.locale}
                            toggleOptional={this.toggleOptional} />
                        <Icon valid={this.hasDeleteButtonFunction}
                            onClick={this.props.onDelete!}
                            text={this.props.icon.delete}
                            theme={this.props.theme}
                            icon={this.props.icon} />
                        <Icon valid={this.canPreview}
                            onClick={this.collapseOrExpand}
                            text={this.collapsed ? this.props.icon.expand : this.props.icon.collapse}
                            theme={this.props.theme}
                            icon={this.props.icon} />
                    </div>
                </label>
                {textarea}
                {input}
                {select}
                {imagePreview}
                {markdownTip}
                {markdownPreview}
                {codePreview}
                <Description theme={this.props.theme} message={this.props.schema.description} />
                <Description theme={this.props.theme} message={this.errorMessage} />
            </div>
        );
    }
    get isReadOnly() {
        return this.props.readonly || this.props.schema.readonly;
    }
    get hasDeleteButtonFunction() {
        return this.props.onDelete && !this.isReadOnly;
    }
    get useTextArea() {
        return this.value !== undefined
            && !this.collapsed
            && (this.props.schema.enum === undefined || this.isReadOnly)
            && (this.props.schema.format === "textarea" || this.props.schema.format === "code" || this.props.schema.format === "markdown");
    }
    get useInput() {
        return this.value !== undefined
            && !this.collapsed
            && (this.props.schema.enum === undefined || this.isReadOnly)
            && (this.props.schema.format !== "textarea" && this.props.schema.format !== "code" && this.props.schema.format !== "markdown");
    }
    get useSelect() {
        return this.value !== undefined && this.props.schema.enum !== undefined && !this.isReadOnly;
    }
    get canPreviewImage() {
        return common.isImageUrl(this.value);
    }
    get canPreviewMarkdown() {
        return this.props.md && this.props.schema.format === "markdown";
    }
    get canPreviewCode() {
        return this.props.hljs && this.props.schema.format === "code";
    }
    get canPreview() {
        return (!!this.value) && (this.canPreviewImage || this.canPreviewMarkdown || this.canPreviewCode);
    }
    get getImageUrl() {
        return this.props.forceHttps ? common.replaceProtocal(this.value!) : this.value;
    }
    get getMarkdown() {
        return this.props.md!.render(this.value!);
    }
    get getCode() {
        return this.props.hljs!.highlightAuto(this.value!).value;
    }
    get willPreviewImage() {
        return this.value && !this.collapsed && this.canPreviewImage;
    }
    get willPreviewMarkdown() {
        return this.value && !this.collapsed && this.canPreviewMarkdown;
    }
    get willPreviewCode() {
        return this.value && !this.collapsed && this.canPreviewCode;
    }
    get titleToShow() {
        return common.getTitle(this.props.title, this.props.schema.title);
    }
    get options() {
        return this.props.schema.enum!.map(e => ({
            value: e,
            label: e,
        }));
    }

    updateSelection(value: string) {
        this.value = value;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    validate() {
        this.errorMessage = common.getErrorMessageOfString(this.value, this.props.schema, this.props.locale);
    }
    toggleOptional = () => {
        this.value = common.toggleOptional(this.value, this.props.schema, this.props.initialValue) as string | undefined;
        this.validate();
        this.setState({ value: this.value });
        this.props.updateValue(this.value, !this.errorMessage);
    }
    collapseOrExpand = () => {
        this.willRender = true;
        this.collapsed = !this.collapsed;
        this.setState({ collapsed: this.collapsed });
    }
}
