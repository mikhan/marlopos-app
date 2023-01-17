export type Country = {
  destinations: string | Destination[];
  id: number;
  name: string | null;
};

export type Destination = {
  coordinates: string;
  country: number | Country;
  cover: string | DirectusFiles | null;
  date_created: string;
  date_updated: string | null;
  id: number;
  location: string;
  more_info: string;
  package: string | PackageDestination[];
  photos: string | DestinationFiles[];
  photosGroup: string;
  translations: string | DestinationTranslations[];
  user_created: string | DirectusUsers;
  user_updated: string | DirectusUsers | null;
};

export type DestinationFiles = {
  destination_id: number | Destination;
  directus_files_id: string | DirectusFiles;
  id: number;
  order: number | null;
};

export type DestinationTranslations = {
  description: string;
  destination_id: number | Destination | null;
  id: number;
  languages_code: string | Languages | null;
  name: string;
  slug: string | null;
};

export type DirectusActivity = {
  action: string;
  collection: string;
  comment: string | null;
  id: number;
  ip: string | null;
  item: string;
  origin: string | null;
  revisions: string | DirectusRevisions[];
  timestamp: string;
  user: string | DirectusUsers | null;
  user_agent: string | null;
};

export type DirectusCollections = {
  accountability: string | null;
  archive_app_filter: boolean;
  archive_field: string | null;
  archive_value: string | null;
  collapse: string;
  collection: string;
  color: string | null;
  display_template: string | null;
  group: string | DirectusCollections | null;
  hidden: boolean;
  icon: string | null;
  item_duplication_fields: unknown | null;
  note: string | null;
  singleton: boolean;
  sort: number | null;
  sort_field: string | null;
  translations: {
    language: string;
    translation: string;
    singular: string;
    plural: string;
  } | null;
  unarchive_value: string | null;
};

export type DirectusDashboards = {
  color: string | null;
  date_created: string | null;
  icon: string;
  id: string;
  name: string;
  note: string | null;
  panels: string | DirectusPanels[];
  user_created: string | DirectusUsers | null;
};

export type DirectusFields = {
  collection: string | DirectusCollections;
  conditions: unknown | null;
  display: string | null;
  display_options: unknown | null;
  field: string;
  group: string | DirectusFields | null;
  hidden: boolean;
  id: number;
  interface: string | null;
  note: string | null;
  options: unknown | null;
  readonly: boolean;
  required: boolean | null;
  sort: number | null;
  special: unknown | null;
  translations: unknown | null;
  validation: unknown | null;
  validation_message: string | null;
  width: string | null;
};

export type DirectusFiles = {
  blurhash: string | null;
  charset: string | null;
  description: string | null;
  duration: number | null;
  embed: string | null;
  filename_disk: string | null;
  filename_download: string;
  filesize: number | null;
  folder: string | DirectusFolders | null;
  height: number | null;
  id: string;
  location: string | null;
  metadata: unknown | null;
  modified_by: string | DirectusUsers | null;
  modified_on: string;
  storage: string;
  tags: unknown | null;
  title: string | null;
  type: string | null;
  uploaded_by: string | DirectusUsers | null;
  uploaded_on: string;
  width: number | null;
};

export type DirectusFlows = {
  accountability: string | null;
  color: string | null;
  date_created: string | null;
  description: string | null;
  icon: string | null;
  id: string;
  name: string;
  operation: string | DirectusOperations | null;
  operations: string | DirectusOperations[];
  options: unknown | null;
  status: string;
  trigger: string | null;
  user_created: string | DirectusUsers | null;
};

export type DirectusFolders = {
  id: string;
  name: string;
  parent: string | DirectusFolders | null;
};

export type DirectusMigrations = {
  name: string;
  timestamp: string | null;
  version: string;
};

export type DirectusNotifications = {
  collection: string | null;
  id: number;
  item: string | null;
  message: string | null;
  recipient: string | DirectusUsers;
  sender: string | DirectusUsers | null;
  status: string | null;
  subject: string;
  timestamp: string | null;
};

export type DirectusOperations = {
  date_created: string | null;
  flow: string | DirectusFlows;
  id: string;
  key: string;
  name: string | null;
  options: unknown | null;
  position_x: number;
  position_y: number;
  reject: string | DirectusOperations | null;
  resolve: string | DirectusOperations | null;
  type: string;
  user_created: string | DirectusUsers | null;
};

export type DirectusPanels = {
  color: string | null;
  dashboard: string | DirectusDashboards;
  date_created: string | null;
  height: number;
  icon: string | null;
  id: string;
  name: string | null;
  note: string | null;
  options: unknown | null;
  position_x: number;
  position_y: number;
  show_header: boolean;
  type: string;
  user_created: string | DirectusUsers | null;
  width: number;
};

export type DirectusPermissions = {
  action: string;
  collection: string;
  fields: unknown | null;
  id: number;
  permissions: unknown | null;
  presets: unknown | null;
  role: string | DirectusRoles | null;
  validation: unknown | null;
};

export type DirectusPresets = {
  bookmark: string | null;
  collection: string | null;
  color: string | null;
  filter: unknown | null;
  icon: string;
  id: number;
  layout: string | null;
  layout_options: unknown | null;
  layout_query: unknown | null;
  refresh_interval: number | null;
  role: string | DirectusRoles | null;
  search: string | null;
  user: string | DirectusUsers | null;
};

export type DirectusRelations = {
  id: number;
  junction_field: string | null;
  many_collection: string;
  many_field: string;
  one_allowed_collections: unknown | null;
  one_collection: string | null;
  one_collection_field: string | null;
  one_deselect_action: string;
  one_field: string | null;
  sort_field: string | null;
};

export type DirectusRevisions = {
  activity: number | DirectusActivity;
  collection: string;
  data: unknown | null;
  delta: unknown | null;
  id: number;
  item: string;
  parent: number | DirectusRevisions | null;
};

export type DirectusRoles = {
  admin_access: boolean;
  app_access: boolean;
  description: string | null;
  enforce_tfa: boolean;
  icon: string;
  id: string;
  ip_access: unknown | null;
  name: string;
  users: string | DirectusUsers[];
};

export type DirectusSessions = {
  expires: string;
  ip: string | null;
  origin: string | null;
  share: string | DirectusShares | null;
  token: string;
  user: string | DirectusUsers | null;
  user_agent: string | null;
};

export type DirectusSettings = {
  auth_login_attempts: number | null;
  auth_password_policy: string | null;
  basemaps: {
    name: string;
    type: string;
    url: string;
    tileSize: number | null;
    attribution: string | null;
  } | null;
  custom_aspect_ratios: {
    text: string;
    value: number;
  } | null;
  custom_css: string | null;
  default_language: string;
  id: number;
  mapbox_key: string | null;
  module_bar: unknown | null;
  project_color: string | null;
  project_descriptor: string | null;
  project_logo: string | DirectusFiles | null;
  project_name: string;
  project_url: string | null;
  public_background: string | DirectusFiles | null;
  public_foreground: string | DirectusFiles | null;
  public_note: string | null;
  storage_asset_presets: {
    key: string;
    fit: string;
    width: number;
    height: number;
    quality: number;
    withoutEnlargement: boolean;
    format: string;
    transforms: unknown;
  } | null;
  storage_asset_transform: string | null;
  storage_default_folder: string | DirectusFolders | null;
  translation_strings: unknown | null;
};

export type DirectusShares = {
  collection: string | DirectusCollections | null;
  date_created: string | null;
  date_end: string | null;
  date_start: string | null;
  id: string;
  item: string | null;
  max_uses: number | null;
  name: string | null;
  password: string | null;
  role: string | DirectusRoles | null;
  times_used: number | null;
  user_created: string | DirectusUsers | null;
};

export type DirectusUsers = {
  auth_data: unknown | null;
  avatar: string | DirectusFiles | null;
  description: string | null;
  email: string | null;
  email_notifications: boolean | null;
  external_identifier: string | null;
  first_name: string | null;
  id: string;
  language: string | null;
  last_access: string | null;
  last_name: string | null;
  last_page: string | null;
  location: string | null;
  password: string | null;
  provider: string;
  role: string | DirectusRoles | null;
  status: string;
  tags: unknown | null;
  tfa_secret: string | null;
  theme: string | null;
  title: string | null;
  token: string | null;
};

export type DirectusWebhooks = {
  actions: unknown;
  collections: unknown;
  data: boolean;
  headers: {
    header: string;
    value: string;
  } | null;
  id: number;
  method: string;
  name: string;
  status: string;
  url: string;
};

export type Experience = {
  code: string | null;
  cover: string | DirectusFiles | null;
  date_created: string | null;
  date_updated: string | null;
  id: number;
  packages: string | PackageExperience[];
  sort: number | null;
  status: string;
  translations: string | ExperienceTranslations[];
  user_created: string | DirectusUsers | null;
  user_updated: string | DirectusUsers | null;
};

export type ExperienceTranslations = {
  experience_id: number | Experience | null;
  id: number;
  languages_code: string | Languages | null;
  name: string;
};

export type Features = {
  date_created: string | null;
  date_updated: string | null;
  description: string;
  icon: string;
  id: number;
  name: string;
  user_created: string | DirectusUsers | null;
  user_updated: string | DirectusUsers | null;
};

export type Information = {
  address: string;
  contact: {
    type: string;
    value: string;
  } | null;
  id: number;
  location: string | null;
  networks: {
    type: string;
    value: string;
  } | null;
  schedule: {
    weekday: string;
    start_time: string;
    end_time: string;
  };
};

export type Languages = {
  code: string;
  direction: string;
  name: string;
};

export type Message = {
  date_created: string | null;
  date_updated: string | null;
  id: number;
  metadata: unknown;
  status: string | null;
  type: string | null;
  user_created: string | DirectusUsers | null;
  user_updated: string | DirectusUsers | null;
};

export type MessageContact = {
  email: string | null;
  from: string | null;
  id: number;
  message: string;
  phone: string | null;
};

export type Package = {
  color: string;
  cover: string | DirectusFiles | null;
  date_created: string | null;
  date_updated: string | null;
  destination: string | PackageDestination[];
  experiences: string | PackageExperience[];
  favorite: boolean;
  features: string | PackageFeatures[];
  id: string;
  schedule: string | PackageSchedule[];
  schedule_metrics: string | PackageScheduleMetrics[];
  status: string;
  translations: string | PackageTranslations[];
  user_created: string | DirectusUsers | null;
  user_updated: string | DirectusUsers | null;
};

export type PackageDestination = {
  days: number | null;
  destination_id: number | Destination;
  id: number;
  nights: number | null;
  package_id: string | Package;
};

export type PackageExperience = {
  experience_id: number | Experience;
  id: number;
  order: number | null;
  package_id: string | Package;
};

export type PackageFeatures = {
  description: string | null;
  features_id: number | Features;
  id: number;
  order: number | null;
  package_id: string | Package | null;
  type: string;
};

export type PackageSchedule = {
  end: string;
  id: number;
  order: number;
  package_id: string | Package;
  start: string;
};

export type PackageScheduleMetrics = {
  date: string;
  id: number;
  package_id: string | Package;
  value: number | null;
};

export type PackageTranslations = {
  description: string;
  id: number;
  languages_code: string | Languages;
  name: string;
  package_id: string | Package;
  slug: string;
};

export type Task = {
  content: string;
  date_completed: string | null;
  date_created: string | null;
  date_updated: string | null;
  id: number;
  name: string;
  status: string;
  user_completed: string | DirectusUsers | null;
  user_created: string | DirectusUsers | null;
  user_updated: string | DirectusUsers | null;
};

export type CustomDirectusTypes = {
  country: Country;
  destination: Destination;
  destination_files: DestinationFiles;
  destination_translations: DestinationTranslations;
  directus_activity: DirectusActivity;
  directus_collections: DirectusCollections;
  directus_dashboards: DirectusDashboards;
  directus_fields: DirectusFields;
  directus_files: DirectusFiles;
  directus_flows: DirectusFlows;
  directus_folders: DirectusFolders;
  directus_migrations: DirectusMigrations;
  directus_notifications: DirectusNotifications;
  directus_operations: DirectusOperations;
  directus_panels: DirectusPanels;
  directus_permissions: DirectusPermissions;
  directus_presets: DirectusPresets;
  directus_relations: DirectusRelations;
  directus_revisions: DirectusRevisions;
  directus_roles: DirectusRoles;
  directus_sessions: DirectusSessions;
  directus_settings: DirectusSettings;
  directus_shares: DirectusShares;
  directus_users: DirectusUsers;
  directus_webhooks: DirectusWebhooks;
  experience: Experience;
  experience_translations: ExperienceTranslations;
  features: Features;
  information: Information;
  languages: Languages;
  message: Message;
  message_contact: MessageContact;
  package: Package;
  package_destination: PackageDestination;
  package_experience: PackageExperience;
  package_features: PackageFeatures;
  package_schedule: PackageSchedule;
  package_schedule_metrics: PackageScheduleMetrics;
  package_translations: PackageTranslations;
  task: Task;
};
