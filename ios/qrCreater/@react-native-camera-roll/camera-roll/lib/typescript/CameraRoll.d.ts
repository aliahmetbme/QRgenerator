export declare type GroupTypes = 'Album' | 'All' | 'Event' | 'Faces' | 'Library' | 'PhotoStream' | 'SavedPhotos';
export declare type SubTypes = 'PhotoPanorama' | 'PhotoHDR' | 'PhotoScreenshot' | 'PhotoLive' | 'PhotoDepthEffect' | 'VideoStreamed' | 'VideoHighFrameRate' | 'VideoTimelapse';
export declare type Include = 'filename' | 'fileSize' | 'fileExtension' | 'location' | 'imageSize' | 'playableDuration' | 'orientation';
export declare type AssetType = 'All' | 'Videos' | 'Photos';
/**
 * Shape of the param arg for the `getPhotos` function.
 */
export declare type GetPhotosParams = {
    /**
     * The number of photos wanted in reverse order of the photo application
     * (i.e. most recent first).
     */
    first: number;
    /**
     * A cursor that matches `page_info { end_cursor }` returned from a previous
     * call to `getPhotos`
     */
    after?: string;
    /**
     * Specifies which group types to filter the results to.
     */
    groupTypes?: GroupTypes;
    /**
     * Specifies filter on group names, like 'Recent Photos' or custom album
     * titles.
     */
    groupName?: string;
    /**
     * Include assets originating from an iCloud Shared Album. iOS only.
     */
    includeSharedAlbums?: boolean;
    /**
     * Specifies filter on asset type
     */
    assetType?: AssetType;
    /**
     * Earliest time to get photos from. A timestamp in milliseconds. Exclusive.
     */
    fromTime?: number;
    /**
     * Latest time to get photos from. A timestamp in milliseconds. Inclusive.
     */
    toTime?: number;
    /**
     * Filter by mimetype (e.g. image/jpeg).
     */
    mimeTypes?: Array<string>;
    /**
     * Specific fields in the output that we want to include, even though they
     * might have some performance impact.
     */
    include?: Include[];
};
export declare type PhotoIdentifier = {
    node: {
        type: string;
        subTypes: SubTypes;
        group_name: string;
        image: {
            filename: string | null;
            filepath: string | null;
            extension: string | null;
            uri: string;
            height: number;
            width: number;
            fileSize: number | null;
            playableDuration: number;
            orientation: number | null;
        };
        timestamp: number;
        modificationTimestamp: number;
        location: {
            latitude?: number;
            longitude?: number;
            altitude?: number;
            heading?: number;
            speed?: number;
        } | null;
    };
};
export declare type PhotoConvertionOptions = {
    convertHeicImages: boolean;
};
export declare type PhotoIdentifiersPage = {
    edges: Array<PhotoIdentifier>;
    page_info: {
        has_next_page: boolean;
        start_cursor?: string;
        end_cursor?: string;
    };
    limited?: boolean;
};
export declare type SaveToCameraRollOptions = {
    type?: 'photo' | 'video' | 'auto';
    album?: string;
};
export declare type GetAlbumsParams = {
    assetType?: AssetType;
};
export declare type AlbumSubType = 'AlbumRegular' | 'AlbumSyncedEvent' | 'AlbumSyncedFaces' | 'AlbumSyncedAlbum' | 'AlbumImported' | 'AlbumMyPhotoStream' | 'AlbumCloudShared' | 'Unknown';
export declare type Album = {
    title: string;
    count: number;
    subtype?: AlbumSubType;
};
/**
 * `CameraRoll` provides access to the local camera roll or photo library.
 *
 * See https://facebook.github.io/react-native/docs/cameraroll.html
 */
export declare class CameraRoll {
    static GroupTypesOptions: {
        Album: string;
        All: string;
        Event: string;
        Faces: string;
        Library: string;
        PhotoStream: string;
        SavedPhotos: string;
    };
    static AssetTypeOptions: {
        All: string;
        Videos: string;
        Photos: string;
    };
    /**
     * On iOS: requests deletion of a set of photos from the camera roll.
     * On Android: Deletes a set of photos from the camera roll.
     *
     */
    static deletePhotos(photoUris: Array<string>): Promise<void>;
    /**
     * Saves the photo or video to the camera roll or photo library.
     *
     */
    static save(tag: string, options?: SaveToCameraRollOptions): Promise<string>;
    static saveToCameraRoll(tag: string, type?: 'photo' | 'video' | 'auto'): Promise<string>;
    static getAlbums(params?: GetAlbumsParams): Promise<Album[]>;
    static getParamsWithDefaults(params: GetPhotosParams): GetPhotosParams;
    /**
     * Returns a Promise with photo identifier objects from the local camera
     * roll of the device matching shape defined by `getPhotosReturnChecker`.
     *
     * See https://facebook.github.io/react-native/docs/cameraroll.html#getphotos
     */
    static getPhotos(params: GetPhotosParams): Promise<PhotoIdentifiersPage>;
    /**
     * Returns a Promise with photo internal path.
     * if conversion is requested from HEIC then temporary file is created.
     *
     * @param internalID - PH photo internal ID.
     * @param convertHeicImages - whether to convert or not heic images to JPEG.
     * @returns Promise<PhotoIdentifier>
     */
    static iosGetImageDataById(internalID: string, convertHeicImages?: boolean): Promise<PhotoIdentifier>;
}
