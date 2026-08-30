/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ResizableFrame from '../index';

jest.mock( '../../../store', () => ( {
	store: {},
} ) );

jest.mock( '../../../lock-unlock', () => ( {
	unlock: ( value ) => value,
} ) );

jest.mock( '@wordpress/components', () => {
	const { forwardRef, useImperativeHandle } = require( '@wordpress/element' );

	const MotionDiv = ( {
		initial,
		variants,
		animate,
		transition,
		whileHover,
		whileFocus,
		...props
	} ) => <div { ...props } />;

	const MotionButton = ( {
		initial,
		variants,
		animate,
		transition,
		whileHover,
		whileFocus,
		exit,
		...props
	} ) => <button { ...props } />;

	return {
		ResizableBox: forwardRef(
			(
				{
					children,
					handleComponent,
					size,
					as,
					initial,
					variants,
					animate,
					transition,
					whileHover,
					whileFocus,
					enable,
					resizeRatio,
					handleClasses,
					handleStyles,
					minWidth,
					maxWidth,
					maxHeight,
					onAnimationComplete,
					onResizeStart,
					onResize,
					onResizeStop,
					onFocus,
					onBlur,
					onMouseOver,
					onMouseOut,
					showHandle,
					className,
					...props
				},
				ref
			) => {
				useImperativeHandle( ref, () => ( {
					resizable: { offsetWidth: 600 },
				} ) );

				return (
					<div
						className={ className }
						data-testid="resizable-box"
						data-width={ size?.width }
						{ ...props }
					>
						{ handleComponent?.left }
						{ children }
					</div>
				);
			}
		),
		Tooltip: ( { children } ) => <>{ children }</>,
		__unstableMotion: {
			div: MotionDiv,
			button: MotionButton,
		},
	};
} );

jest.mock( '@wordpress/data', () => ( {
	useSelect: () => 'view',
	useDispatch: () => ( { setCanvasMode: jest.fn() } ),
} ) );

jest.mock( '@wordpress/compose', () => ( {
	useInstanceId: () => 'resizable-frame-handle-help',
	useReducedMotion: () => false,
} ) );

describe( 'ResizableFrame', () => {
	it( 'resizes smaller when the left arrow key is pressed', () => {
		render(
			<ResizableFrame
				defaultSize={ { width: 1300, height: 800 } }
				isFullWidth={ false }
				isOversized={ false }
				setIsOversized={ jest.fn() }
				isReady
				innerContentStyle={ {} }
			>
				<span>Content</span>
			</ResizableFrame>
		);

		fireEvent.keyDown( screen.getByRole( 'separator' ), {
			key: 'ArrowLeft',
		} );

		expect( screen.getByTestId( 'resizable-box' ) ).toHaveAttribute(
			'data-width',
			'580'
		);
	} );

	it( 'resizes larger when the right arrow key is pressed', () => {
		render(
			<ResizableFrame
				defaultSize={ { width: 1300, height: 800 } }
				isFullWidth={ false }
				isOversized={ false }
				setIsOversized={ jest.fn() }
				isReady
				innerContentStyle={ {} }
			>
				<span>Content</span>
			</ResizableFrame>
		);

		fireEvent.keyDown( screen.getByRole( 'separator' ), {
			key: 'ArrowRight',
		} );

		expect( screen.getByTestId( 'resizable-box' ) ).toHaveAttribute(
			'data-width',
			'620'
		);
	} );
} );
