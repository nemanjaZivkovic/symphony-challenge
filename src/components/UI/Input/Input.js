import React, { Fragment } from 'react';
import isEqual from 'lodash.isequal';
import {
	TextInput as TextInputUI,
	Combobox,
	Menu,
	Popover,
	Position,
	Autocomplete,
	Textarea as TextArea,
	RadioGroup as Radiogroup,
	Checkbox as CheckboxUI,
	Button
} from 'evergreen-ui';
import classes from './Input.module.scss';
import { AutocompleteItem } from 'evergreen-ui/commonjs/autocomplete';

const defaultInputProps = ({ name, value, type, placeholder, onChange, onClick, onBlur, disabled }) => {
	return {
		type,
		id: name + '-input',
		placeholder,
		value,
		onChange,
		onBlur,
		onClick,
		disabled
	};
};

const InputWrapper = (inputComponent, error, label, className, style, name, icon) => {
	return (
		<div
			className={[ classes.wrapper, className ].join(' ')}
			style={{ ...style }}
			aria-invalid={String(Boolean(error))}
		>
			<label htmlFor={name + '-input'} className={classes.label}>
				{label}
			</label>
			{icon ? (
				<div className={classes.iconWrapper}>
					{inputComponent}
					<span className={classes.inputIcon}>{icon}</span>
				</div>
			) : (
				inputComponent
			)}
			<span className={classes.error}>{error || <Fragment>&nbsp;</Fragment>}</span>
		</div>
	);
};

// regular text input
export const TextInput = React.memo(({ error, label, className, style, icon, ...restProps }) => {
	const iconClass = icon ? classes['input--icon'] : '';
	const component = (
		<TextInputUI
			{...defaultInputProps(restProps)}
			className={[ classes['input'], classes['input--text'], iconClass ].join(' ')}
		/>
	);

	return InputWrapper(component, error, label, className, style, restProps.name, icon);
}, isPropsEqual);

// text area
export const Textarea = React.memo(({ error, label, className, style, icon, ...restProps }) => {
	const component = (
		<TextArea
			{...defaultInputProps(restProps)}
			className={[ classes['input'], classes['input--textarea'] ].join(' ')}
			//isInvalid={Boolean(error)}
		/>
	);

	return InputWrapper(component, error, label, className, style, restProps.name, icon);
}, isPropsEqual);

// select input
export const Select = React.memo(
	({ items, error, onBlur, label, className, style, value, icon, onChange, placeholder, ...restProps }) => {
		const onSelect = (item, close) => () => {
			onChange(item);
			close();
		};

		const component = (
			<Popover
				position={Position.BOTTOM_LEFT}
				content={({ close }) => (
					<div className={classes.selectMenu}>
						<Menu style={{ display: 'none' }} onBlur={onBlur}>
							{items.map((item) => (
								<Menu.Item key={item.value} onSelect={onSelect(item, close)}>
									{item.label}
								</Menu.Item>
							))}
						</Menu>
					</div>
				)}
			>
				<Button
					className={[
						classes.selectTrigger,
						!value.value ? classes['selectTrigger--placeholder'] : ''
					].join(' ')}
					{...defaultInputProps(restProps)}
					type="button"
				>
					{value.label || placeholder}
				</Button>
			</Popover>
		);
		return InputWrapper(component, error, label, className, style, restProps.name, icon);
	},
	isPropsEqual
);

// select combo input
export const ComboInput = React.memo(({ items, error, onBlur, label, className, style, value, icon, ...restProps }) => {
	const component = (
		<Combobox
			{...defaultInputProps(restProps)}
			selectedItem={items.find((item) => item.value === value)}
			className={[ classes['input'], classes['input--combo'] ].join(' ')}
			autocompleteProps={{
				//renderItem: (props) => <span {...props}/>
			}}
			inputProps={{
				//isInvalid: Boolean(error)
			}}
			buttonProps={{
				//icon: 'arrow-up'
			}}
			items={items}
			itemToString={(item) => (item ? item.label : '')}
			onBlur={onBlur}
			openOnFocus
		/>
	);
	return InputWrapper(component, error, label, className, style, restProps.name, icon);
}, isPropsEqual);

// autocomplete input
export const AutocompleteInput = ({
	value,
	forcedInputValue,
	items,
	itemsFilter,
	itemToString,
	error,
	onChangeInputValue,
	onChangeItem,
	onBlur,
	label,
	className,
	style,
	icon,
	onClick,
	isOpened,
	...restProps
}) => {
	const component = (
		<Autocomplete
			onInputValueChange={onChangeInputValue}
			items={items}
			value={value}
			itemsFilter={itemsFilter}
			itemToString={itemToString}
			onSelect={onChangeItem}
			// there was an issue with touch devices, touch wasn't triggering the items at all, so we added it explicitly
			renderItem={(props) => (
				<AutocompleteItem
					{...props}
					onTouchStart={() => onChangeItem(items.find((item) => item.label === props.children), 'touchFlag')}
				/>
			)}
		>
			{(props) => {
				const { getInputProps, getRef, inputValue } = props;
				return (
					<TextInputUI
						className={[ classes['input'], classes['input--text'] ].join(' ')}
						{...defaultInputProps(restProps)}
						value={inputValue}
						innerRef={getRef}
						{...getInputProps()}
						onBlur={onBlur}
						{...(forcedInputValue ? { value: forcedInputValue } : {})}
					/>
				);
			}}
		</Autocomplete>
	);

	return InputWrapper(component, error, label, className, style, restProps.name, icon);
};

// radio group
export const RadioGroup = React.memo(({ error, options, label, className, style, icon, ...restProps }) => {
	const component = (
		<Radiogroup
			{...defaultInputProps(restProps)}
			className={[ classes['input'], classes['input--radio-group'] ].join(' ')}
			options={options}
		/>
	);
	return InputWrapper(component, error, label, className, style, restProps.name, icon);
}, isPropsEqual);

// checkbox
export const Checkbox = React.memo(
	({ error, onChange, value, checkboxLabel, label, className, style, icon, ...restProps }) => {
		const component = (
			<CheckboxUI
				{...defaultInputProps(restProps)}
				className={[ classes['input'], classes['input--checkbox'] ].join(' ')}
				label={checkboxLabel}
				checked={Boolean(value)}
				onChange={onChange}
			/>
		);
		return InputWrapper(component, error, label, className, style, restProps.name, icon);
	},
	isPropsEqual
);

// if props are equal block the update/render of this component to optimise the app
// add any prop that should trigger component re-render
function isPropsEqual(prevProps, nextProps) {
	return (
		prevProps.value === nextProps.value &&
		prevProps.error === nextProps.error &&
		isEqual(prevProps.items, nextProps.items) &&
		prevProps.type === nextProps.type &&
		prevProps.disabled === nextProps.disabled
	);
}

// default export if no specific export is specified during import of this component
export default React.memo(TextInput, isPropsEqual);
