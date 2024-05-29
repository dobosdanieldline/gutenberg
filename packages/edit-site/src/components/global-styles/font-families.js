/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalVStack as VStack,
	Button,
} from '@wordpress/components';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import FontLibraryProvider, {
	FontLibraryContext,
} from './font-library-modal/context';
import FontLibraryModal from './font-library-modal';
import FontFamilyItem from './font-family-item';
import Subtitle from './subtitle';

function FontFamilies() {
	const { modalTabOpen, toggleModal, themeFonts, customFonts } =
		useContext( FontLibraryContext );

	const hasFonts = 0 < customFonts.length || 0 < themeFonts.length;

	return (
		<>
			{ !! modalTabOpen && (
				<FontLibraryModal
					onRequestClose={ () => toggleModal() }
					defaultTabId={ modalTabOpen }
				/>
			) }

			<VStack spacing={ 2 }>
				<Subtitle level={ 3 }>{ __( 'Fonts' ) }</Subtitle>
				{ hasFonts ? (
					<>
						<ItemGroup isBordered isSeparated>
							{ customFonts.map( ( font ) => (
								<FontFamilyItem
									key={ font.slug }
									font={ font }
								/>
							) ) }
							{ themeFonts.map( ( font ) => (
								<FontFamilyItem
									key={ font.slug }
									font={ font }
								/>
							) ) }
						</ItemGroup>
						<Button
							className="edit-site-global-styles-font-families__manage-fonts"
							variant="secondary"
							onClick={ () => toggleModal( 'installed-fonts' ) }
						>
							{ __( 'Manage fonts' ) }
						</Button>
					</>
				) : (
					<>
						{ __( 'No fonts installed.' ) }
						<Button
							className="edit-site-global-styles-font-families__add-fonts"
							variant="secondary"
							onClick={ () => toggleModal( 'upload-fonts' ) }
						>
							{ __( 'Add fonts' ) }
						</Button>
					</>
				) }
			</VStack>
		</>
	);
}

export default ( { ...props } ) => (
	<FontLibraryProvider>
		<FontFamilies { ...props } />
	</FontLibraryProvider>
);
