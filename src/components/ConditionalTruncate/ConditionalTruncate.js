import React from 'react';
import TextEllipsis from 'react-text-ellipsis';

const ConditionalTruncate = ({ children, condition = true, tag = 'p', lines = 1, ellipsis = '...' }) => {
	if (condition) {
		return (
			<TextEllipsis
				tag={tag}
				lines={lines}
				ellipsisChars={ellipsis}
				debounceTimeoutOnResize={140}
				useJsOnly={true}
			>
				{children}
			</TextEllipsis>
		);
	} else {
		return children;
	}
};

export default ConditionalTruncate;
