export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      country: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      destination: {
        Row: {
          coordinates: unknown
          country: number
          cover: string | null
          date_created: string
          date_updated: string | null
          id: number
          user_created: string
          user_updated: string | null
        }
        Insert: {
          coordinates?: unknown
          country: number
          cover?: string | null
          date_created: string
          date_updated?: string | null
          id?: number
          user_created: string
          user_updated?: string | null
        }
        Update: {
          coordinates?: unknown
          country?: number
          cover?: string | null
          date_created?: string
          date_updated?: string | null
          id?: number
          user_created?: string
          user_updated?: string | null
        }
      }
      destination_files: {
        Row: {
          destination_id: number
          directus_files_id: string
          id: number
          order: number | null
        }
        Insert: {
          destination_id: number
          directus_files_id: string
          id?: number
          order?: number | null
        }
        Update: {
          destination_id?: number
          directus_files_id?: string
          id?: number
          order?: number | null
        }
      }
      destination_translations: {
        Row: {
          description: string
          destination_id: number | null
          id: number
          languages_code: string | null
          name: string
          slug: string | null
        }
        Insert: {
          description: string
          destination_id?: number | null
          id?: number
          languages_code?: string | null
          name: string
          slug?: string | null
        }
        Update: {
          description?: string
          destination_id?: number | null
          id?: number
          languages_code?: string | null
          name?: string
          slug?: string | null
        }
      }
      directus_activity: {
        Row: {
          action: string
          collection: string
          comment: string | null
          id: number
          ip: string | null
          item: string
          origin: string | null
          timestamp: string
          user: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          collection: string
          comment?: string | null
          id?: number
          ip?: string | null
          item: string
          origin?: string | null
          timestamp?: string
          user?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          collection?: string
          comment?: string | null
          id?: number
          ip?: string | null
          item?: string
          origin?: string | null
          timestamp?: string
          user?: string | null
          user_agent?: string | null
        }
      }
      directus_collections: {
        Row: {
          accountability: string | null
          archive_app_filter: boolean
          archive_field: string | null
          archive_value: string | null
          collapse: string
          collection: string
          color: string | null
          display_template: string | null
          group: string | null
          hidden: boolean
          icon: string | null
          item_duplication_fields: Json | null
          note: string | null
          singleton: boolean
          sort: number | null
          sort_field: string | null
          translations: Json | null
          unarchive_value: string | null
        }
        Insert: {
          accountability?: string | null
          archive_app_filter?: boolean
          archive_field?: string | null
          archive_value?: string | null
          collapse?: string
          collection: string
          color?: string | null
          display_template?: string | null
          group?: string | null
          hidden?: boolean
          icon?: string | null
          item_duplication_fields?: Json | null
          note?: string | null
          singleton?: boolean
          sort?: number | null
          sort_field?: string | null
          translations?: Json | null
          unarchive_value?: string | null
        }
        Update: {
          accountability?: string | null
          archive_app_filter?: boolean
          archive_field?: string | null
          archive_value?: string | null
          collapse?: string
          collection?: string
          color?: string | null
          display_template?: string | null
          group?: string | null
          hidden?: boolean
          icon?: string | null
          item_duplication_fields?: Json | null
          note?: string | null
          singleton?: boolean
          sort?: number | null
          sort_field?: string | null
          translations?: Json | null
          unarchive_value?: string | null
        }
      }
      directus_dashboards: {
        Row: {
          color: string | null
          date_created: string | null
          icon: string
          id: string
          name: string
          note: string | null
          user_created: string | null
        }
        Insert: {
          color?: string | null
          date_created?: string | null
          icon?: string
          id: string
          name: string
          note?: string | null
          user_created?: string | null
        }
        Update: {
          color?: string | null
          date_created?: string | null
          icon?: string
          id?: string
          name?: string
          note?: string | null
          user_created?: string | null
        }
      }
      directus_fields: {
        Row: {
          collection: string
          conditions: Json | null
          display: string | null
          display_options: Json | null
          field: string
          group: string | null
          hidden: boolean
          id: number
          interface: string | null
          note: string | null
          options: Json | null
          readonly: boolean
          required: boolean | null
          sort: number | null
          special: string | null
          translations: Json | null
          validation: Json | null
          validation_message: string | null
          width: string | null
        }
        Insert: {
          collection: string
          conditions?: Json | null
          display?: string | null
          display_options?: Json | null
          field: string
          group?: string | null
          hidden?: boolean
          id?: number
          interface?: string | null
          note?: string | null
          options?: Json | null
          readonly?: boolean
          required?: boolean | null
          sort?: number | null
          special?: string | null
          translations?: Json | null
          validation?: Json | null
          validation_message?: string | null
          width?: string | null
        }
        Update: {
          collection?: string
          conditions?: Json | null
          display?: string | null
          display_options?: Json | null
          field?: string
          group?: string | null
          hidden?: boolean
          id?: number
          interface?: string | null
          note?: string | null
          options?: Json | null
          readonly?: boolean
          required?: boolean | null
          sort?: number | null
          special?: string | null
          translations?: Json | null
          validation?: Json | null
          validation_message?: string | null
          width?: string | null
        }
      }
      directus_files: {
        Row: {
          blurhash: string | null
          charset: string | null
          description: string | null
          duration: number | null
          embed: string | null
          filename_disk: string | null
          filename_download: string
          filesize: number | null
          folder: string | null
          height: number | null
          id: string
          location: string | null
          metadata: Json | null
          modified_by: string | null
          modified_on: string
          storage: string
          tags: string | null
          title: string | null
          type: string | null
          uploaded_by: string | null
          uploaded_on: string
          width: number | null
        }
        Insert: {
          blurhash?: string | null
          charset?: string | null
          description?: string | null
          duration?: number | null
          embed?: string | null
          filename_disk?: string | null
          filename_download: string
          filesize?: number | null
          folder?: string | null
          height?: number | null
          id: string
          location?: string | null
          metadata?: Json | null
          modified_by?: string | null
          modified_on?: string
          storage: string
          tags?: string | null
          title?: string | null
          type?: string | null
          uploaded_by?: string | null
          uploaded_on?: string
          width?: number | null
        }
        Update: {
          blurhash?: string | null
          charset?: string | null
          description?: string | null
          duration?: number | null
          embed?: string | null
          filename_disk?: string | null
          filename_download?: string
          filesize?: number | null
          folder?: string | null
          height?: number | null
          id?: string
          location?: string | null
          metadata?: Json | null
          modified_by?: string | null
          modified_on?: string
          storage?: string
          tags?: string | null
          title?: string | null
          type?: string | null
          uploaded_by?: string | null
          uploaded_on?: string
          width?: number | null
        }
      }
      directus_flows: {
        Row: {
          accountability: string | null
          color: string | null
          date_created: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          operation: string | null
          options: Json | null
          status: string
          trigger: string | null
          user_created: string | null
        }
        Insert: {
          accountability?: string | null
          color?: string | null
          date_created?: string | null
          description?: string | null
          icon?: string | null
          id: string
          name: string
          operation?: string | null
          options?: Json | null
          status?: string
          trigger?: string | null
          user_created?: string | null
        }
        Update: {
          accountability?: string | null
          color?: string | null
          date_created?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          operation?: string | null
          options?: Json | null
          status?: string
          trigger?: string | null
          user_created?: string | null
        }
      }
      directus_folders: {
        Row: {
          id: string
          name: string
          parent: string | null
        }
        Insert: {
          id: string
          name: string
          parent?: string | null
        }
        Update: {
          id?: string
          name?: string
          parent?: string | null
        }
      }
      directus_migrations: {
        Row: {
          name: string
          timestamp: string | null
          version: string
        }
        Insert: {
          name: string
          timestamp?: string | null
          version: string
        }
        Update: {
          name?: string
          timestamp?: string | null
          version?: string
        }
      }
      directus_notifications: {
        Row: {
          collection: string | null
          id: number
          item: string | null
          message: string | null
          recipient: string
          sender: string | null
          status: string | null
          subject: string
          timestamp: string | null
        }
        Insert: {
          collection?: string | null
          id?: number
          item?: string | null
          message?: string | null
          recipient: string
          sender?: string | null
          status?: string | null
          subject: string
          timestamp?: string | null
        }
        Update: {
          collection?: string | null
          id?: number
          item?: string | null
          message?: string | null
          recipient?: string
          sender?: string | null
          status?: string | null
          subject?: string
          timestamp?: string | null
        }
      }
      directus_operations: {
        Row: {
          date_created: string | null
          flow: string
          id: string
          key: string
          name: string | null
          options: Json | null
          position_x: number
          position_y: number
          reject: string | null
          resolve: string | null
          type: string
          user_created: string | null
        }
        Insert: {
          date_created?: string | null
          flow: string
          id: string
          key: string
          name?: string | null
          options?: Json | null
          position_x: number
          position_y: number
          reject?: string | null
          resolve?: string | null
          type: string
          user_created?: string | null
        }
        Update: {
          date_created?: string | null
          flow?: string
          id?: string
          key?: string
          name?: string | null
          options?: Json | null
          position_x?: number
          position_y?: number
          reject?: string | null
          resolve?: string | null
          type?: string
          user_created?: string | null
        }
      }
      directus_panels: {
        Row: {
          color: string | null
          dashboard: string
          date_created: string | null
          height: number
          icon: string | null
          id: string
          name: string | null
          note: string | null
          options: Json | null
          position_x: number
          position_y: number
          show_header: boolean
          type: string
          user_created: string | null
          width: number
        }
        Insert: {
          color?: string | null
          dashboard: string
          date_created?: string | null
          height: number
          icon?: string | null
          id: string
          name?: string | null
          note?: string | null
          options?: Json | null
          position_x: number
          position_y: number
          show_header?: boolean
          type: string
          user_created?: string | null
          width: number
        }
        Update: {
          color?: string | null
          dashboard?: string
          date_created?: string | null
          height?: number
          icon?: string | null
          id?: string
          name?: string | null
          note?: string | null
          options?: Json | null
          position_x?: number
          position_y?: number
          show_header?: boolean
          type?: string
          user_created?: string | null
          width?: number
        }
      }
      directus_permissions: {
        Row: {
          action: string
          collection: string
          fields: string | null
          id: number
          permissions: Json | null
          presets: Json | null
          role: string | null
          validation: Json | null
        }
        Insert: {
          action: string
          collection: string
          fields?: string | null
          id?: number
          permissions?: Json | null
          presets?: Json | null
          role?: string | null
          validation?: Json | null
        }
        Update: {
          action?: string
          collection?: string
          fields?: string | null
          id?: number
          permissions?: Json | null
          presets?: Json | null
          role?: string | null
          validation?: Json | null
        }
      }
      directus_presets: {
        Row: {
          bookmark: string | null
          collection: string | null
          color: string | null
          filter: Json | null
          icon: string
          id: number
          layout: string | null
          layout_options: Json | null
          layout_query: Json | null
          refresh_interval: number | null
          role: string | null
          search: string | null
          user: string | null
        }
        Insert: {
          bookmark?: string | null
          collection?: string | null
          color?: string | null
          filter?: Json | null
          icon?: string
          id?: number
          layout?: string | null
          layout_options?: Json | null
          layout_query?: Json | null
          refresh_interval?: number | null
          role?: string | null
          search?: string | null
          user?: string | null
        }
        Update: {
          bookmark?: string | null
          collection?: string | null
          color?: string | null
          filter?: Json | null
          icon?: string
          id?: number
          layout?: string | null
          layout_options?: Json | null
          layout_query?: Json | null
          refresh_interval?: number | null
          role?: string | null
          search?: string | null
          user?: string | null
        }
      }
      directus_relations: {
        Row: {
          id: number
          junction_field: string | null
          many_collection: string
          many_field: string
          one_allowed_collections: string | null
          one_collection: string | null
          one_collection_field: string | null
          one_deselect_action: string
          one_field: string | null
          sort_field: string | null
        }
        Insert: {
          id?: number
          junction_field?: string | null
          many_collection: string
          many_field: string
          one_allowed_collections?: string | null
          one_collection?: string | null
          one_collection_field?: string | null
          one_deselect_action?: string
          one_field?: string | null
          sort_field?: string | null
        }
        Update: {
          id?: number
          junction_field?: string | null
          many_collection?: string
          many_field?: string
          one_allowed_collections?: string | null
          one_collection?: string | null
          one_collection_field?: string | null
          one_deselect_action?: string
          one_field?: string | null
          sort_field?: string | null
        }
      }
      directus_revisions: {
        Row: {
          activity: number
          collection: string
          data: Json | null
          delta: Json | null
          id: number
          item: string
          parent: number | null
        }
        Insert: {
          activity: number
          collection: string
          data?: Json | null
          delta?: Json | null
          id?: number
          item: string
          parent?: number | null
        }
        Update: {
          activity?: number
          collection?: string
          data?: Json | null
          delta?: Json | null
          id?: number
          item?: string
          parent?: number | null
        }
      }
      directus_roles: {
        Row: {
          admin_access: boolean
          app_access: boolean
          description: string | null
          enforce_tfa: boolean
          icon: string
          id: string
          ip_access: string | null
          name: string
        }
        Insert: {
          admin_access?: boolean
          app_access?: boolean
          description?: string | null
          enforce_tfa?: boolean
          icon?: string
          id: string
          ip_access?: string | null
          name: string
        }
        Update: {
          admin_access?: boolean
          app_access?: boolean
          description?: string | null
          enforce_tfa?: boolean
          icon?: string
          id?: string
          ip_access?: string | null
          name?: string
        }
      }
      directus_sessions: {
        Row: {
          expires: string
          ip: string | null
          origin: string | null
          share: string | null
          token: string
          user: string | null
          user_agent: string | null
        }
        Insert: {
          expires: string
          ip?: string | null
          origin?: string | null
          share?: string | null
          token: string
          user?: string | null
          user_agent?: string | null
        }
        Update: {
          expires?: string
          ip?: string | null
          origin?: string | null
          share?: string | null
          token?: string
          user?: string | null
          user_agent?: string | null
        }
      }
      directus_settings: {
        Row: {
          auth_login_attempts: number | null
          auth_password_policy: string | null
          basemaps: Json | null
          custom_aspect_ratios: Json | null
          custom_css: string | null
          default_language: string
          id: number
          PUBLIC_MAPBOX_key: string | null
          module_bar: Json | null
          project_color: string | null
          project_descriptor: string | null
          project_logo: string | null
          project_name: string
          project_url: string | null
          public_background: string | null
          public_foreground: string | null
          public_note: string | null
          storage_asset_presets: Json | null
          storage_asset_transform: string | null
          storage_default_folder: string | null
          translation_strings: Json | null
        }
        Insert: {
          auth_login_attempts?: number | null
          auth_password_policy?: string | null
          basemaps?: Json | null
          custom_aspect_ratios?: Json | null
          custom_css?: string | null
          default_language?: string
          id?: number
          PUBLIC_MAPBOX_key?: string | null
          module_bar?: Json | null
          project_color?: string | null
          project_descriptor?: string | null
          project_logo?: string | null
          project_name?: string
          project_url?: string | null
          public_background?: string | null
          public_foreground?: string | null
          public_note?: string | null
          storage_asset_presets?: Json | null
          storage_asset_transform?: string | null
          storage_default_folder?: string | null
          translation_strings?: Json | null
        }
        Update: {
          auth_login_attempts?: number | null
          auth_password_policy?: string | null
          basemaps?: Json | null
          custom_aspect_ratios?: Json | null
          custom_css?: string | null
          default_language?: string
          id?: number
          PUBLIC_MAPBOX_key?: string | null
          module_bar?: Json | null
          project_color?: string | null
          project_descriptor?: string | null
          project_logo?: string | null
          project_name?: string
          project_url?: string | null
          public_background?: string | null
          public_foreground?: string | null
          public_note?: string | null
          storage_asset_presets?: Json | null
          storage_asset_transform?: string | null
          storage_default_folder?: string | null
          translation_strings?: Json | null
        }
      }
      directus_shares: {
        Row: {
          collection: string | null
          date_created: string | null
          date_end: string | null
          date_start: string | null
          id: string
          item: string | null
          max_uses: number | null
          name: string | null
          password: string | null
          role: string | null
          times_used: number | null
          user_created: string | null
        }
        Insert: {
          collection?: string | null
          date_created?: string | null
          date_end?: string | null
          date_start?: string | null
          id: string
          item?: string | null
          max_uses?: number | null
          name?: string | null
          password?: string | null
          role?: string | null
          times_used?: number | null
          user_created?: string | null
        }
        Update: {
          collection?: string | null
          date_created?: string | null
          date_end?: string | null
          date_start?: string | null
          id?: string
          item?: string | null
          max_uses?: number | null
          name?: string | null
          password?: string | null
          role?: string | null
          times_used?: number | null
          user_created?: string | null
        }
      }
      directus_users: {
        Row: {
          auth_data: Json | null
          avatar: string | null
          description: string | null
          email: string | null
          email_notifications: boolean | null
          external_identifier: string | null
          first_name: string | null
          id: string
          language: string | null
          last_access: string | null
          last_name: string | null
          last_page: string | null
          location: string | null
          password: string | null
          provider: string
          role: string | null
          status: string
          tags: Json | null
          tfa_secret: string | null
          theme: string | null
          title: string | null
          token: string | null
        }
        Insert: {
          auth_data?: Json | null
          avatar?: string | null
          description?: string | null
          email?: string | null
          email_notifications?: boolean | null
          external_identifier?: string | null
          first_name?: string | null
          id: string
          language?: string | null
          last_access?: string | null
          last_name?: string | null
          last_page?: string | null
          location?: string | null
          password?: string | null
          provider?: string
          role?: string | null
          status?: string
          tags?: Json | null
          tfa_secret?: string | null
          theme?: string | null
          title?: string | null
          token?: string | null
        }
        Update: {
          auth_data?: Json | null
          avatar?: string | null
          description?: string | null
          email?: string | null
          email_notifications?: boolean | null
          external_identifier?: string | null
          first_name?: string | null
          id?: string
          language?: string | null
          last_access?: string | null
          last_name?: string | null
          last_page?: string | null
          location?: string | null
          password?: string | null
          provider?: string
          role?: string | null
          status?: string
          tags?: Json | null
          tfa_secret?: string | null
          theme?: string | null
          title?: string | null
          token?: string | null
        }
      }
      directus_webhooks: {
        Row: {
          actions: string
          collections: string
          data: boolean
          headers: Json | null
          id: number
          method: string
          name: string
          status: string
          url: string
        }
        Insert: {
          actions: string
          collections: string
          data?: boolean
          headers?: Json | null
          id?: number
          method?: string
          name: string
          status?: string
          url: string
        }
        Update: {
          actions?: string
          collections?: string
          data?: boolean
          headers?: Json | null
          id?: number
          method?: string
          name?: string
          status?: string
          url?: string
        }
      }
      experience: {
        Row: {
          cover: string | null
          date_created: string | null
          date_updated: string | null
          id: number
          sort: number | null
          status: string
          user_created: string | null
          user_updated: string | null
        }
        Insert: {
          cover?: string | null
          date_created?: string | null
          date_updated?: string | null
          id?: number
          sort?: number | null
          status?: string
          user_created?: string | null
          user_updated?: string | null
        }
        Update: {
          cover?: string | null
          date_created?: string | null
          date_updated?: string | null
          id?: number
          sort?: number | null
          status?: string
          user_created?: string | null
          user_updated?: string | null
        }
      }
      experience_translations: {
        Row: {
          experience_id: number | null
          id: number
          languages_code: string | null
          name: string
        }
        Insert: {
          experience_id?: number | null
          id?: number
          languages_code?: string | null
          name?: string
        }
        Update: {
          experience_id?: number | null
          id?: number
          languages_code?: string | null
          name?: string
        }
      }
      features: {
        Row: {
          date_created: string | null
          date_updated: string | null
          description: string
          icon: string
          id: number
          name: string
          user_created: string | null
          user_updated: string | null
        }
        Insert: {
          date_created?: string | null
          date_updated?: string | null
          description: string
          icon: string
          id?: number
          name: string
          user_created?: string | null
          user_updated?: string | null
        }
        Update: {
          date_created?: string | null
          date_updated?: string | null
          description?: string
          icon?: string
          id?: number
          name?: string
          user_created?: string | null
          user_updated?: string | null
        }
      }
      information: {
        Row: {
          address: string
          contact: Json | null
          id: number
          location: unknown | null
          networks: Json | null
          schedule: Json
        }
        Insert: {
          address: string
          contact?: Json | null
          id?: number
          location?: unknown | null
          networks?: Json | null
          schedule?: Json
        }
        Update: {
          address?: string
          contact?: Json | null
          id?: number
          location?: unknown | null
          networks?: Json | null
          schedule?: Json
        }
      }
      languages: {
        Row: {
          code: string
          direction: string
          name: string
        }
        Insert: {
          code: string
          direction?: string
          name?: string
        }
        Update: {
          code?: string
          direction?: string
          name?: string
        }
      }
      message: {
        Row: {
          date_created: string | null
          date_updated: string | null
          id: number
          metadata: Json
          status: string | null
          type: string | null
          user_created: string | null
          user_updated: string | null
        }
        Insert: {
          date_created?: string | null
          date_updated?: string | null
          id?: number
          metadata?: Json
          status?: string | null
          type?: string | null
          user_created?: string | null
          user_updated?: string | null
        }
        Update: {
          date_created?: string | null
          date_updated?: string | null
          id?: number
          metadata?: Json
          status?: string | null
          type?: string | null
          user_created?: string | null
          user_updated?: string | null
        }
      }
      message_contact: {
        Row: {
          email: string | null
          from: string | null
          id: number
          message: string
          phone: string | null
        }
        Insert: {
          email?: string | null
          from?: string | null
          id?: number
          message: string
          phone?: string | null
        }
        Update: {
          email?: string | null
          from?: string | null
          id?: number
          message?: string
          phone?: string | null
        }
      }
      package: {
        Row: {
          color: string
          cover: string | null
          date_created: string | null
          date_updated: string | null
          favorite: boolean
          id: string
          status: string
          user_created: string | null
          user_updated: string | null
        }
        Insert: {
          color?: string
          cover?: string | null
          date_created?: string | null
          date_updated?: string | null
          favorite?: boolean
          id: string
          status?: string
          user_created?: string | null
          user_updated?: string | null
        }
        Update: {
          color?: string
          cover?: string | null
          date_created?: string | null
          date_updated?: string | null
          favorite?: boolean
          id?: string
          status?: string
          user_created?: string | null
          user_updated?: string | null
        }
      }
      package_destination: {
        Row: {
          days: number | null
          destination_id: number
          id: number
          nights: number | null
          package_id: string
        }
        Insert: {
          days?: number | null
          destination_id: number
          id?: number
          nights?: number | null
          package_id: string
        }
        Update: {
          days?: number | null
          destination_id?: number
          id?: number
          nights?: number | null
          package_id?: string
        }
      }
      package_experience: {
        Row: {
          experience_id: number
          id: number
          order: number | null
          package_id: string
        }
        Insert: {
          experience_id: number
          id?: number
          order?: number | null
          package_id: string
        }
        Update: {
          experience_id?: number
          id?: number
          order?: number | null
          package_id?: string
        }
      }
      package_features: {
        Row: {
          description: string | null
          features_id: number
          id: number
          order: number | null
          package_id: string | null
          type: string
        }
        Insert: {
          description?: string | null
          features_id: number
          id?: number
          order?: number | null
          package_id?: string | null
          type: string
        }
        Update: {
          description?: string | null
          features_id?: number
          id?: number
          order?: number | null
          package_id?: string | null
          type?: string
        }
      }
      package_schedule: {
        Row: {
          end: string
          id: number
          order: number
          package_id: string
          start: string
        }
        Insert: {
          end: string
          id?: number
          order?: number
          package_id: string
          start: string
        }
        Update: {
          end?: string
          id?: number
          order?: number
          package_id?: string
          start?: string
        }
      }
      package_schedule_metrics: {
        Row: {
          date: string
          id: number
          package_id: string
          value: number | null
        }
        Insert: {
          date: string
          id?: number
          package_id: string
          value?: number | null
        }
        Update: {
          date?: string
          id?: number
          package_id?: string
          value?: number | null
        }
      }
      package_translations: {
        Row: {
          content: string | null
          description: string
          id: number
          languages_code: string
          name: string
          package_id: string
          slug: string
        }
        Insert: {
          content?: string | null
          description: string
          id?: number
          languages_code?: string
          name: string
          package_id: string
          slug?: string
        }
        Update: {
          content?: string | null
          description?: string
          id?: number
          languages_code?: string
          name?: string
          package_id?: string
          slug?: string
        }
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
      }
      task: {
        Row: {
          content: string
          date_completed: string | null
          date_created: string | null
          date_updated: string | null
          id: number
          name: string
          status: string
          user_completed: string | null
          user_created: string | null
          user_updated: string | null
        }
        Insert: {
          content: string
          date_completed?: string | null
          date_created?: string | null
          date_updated?: string | null
          id?: number
          name: string
          status?: string
          user_completed?: string | null
          user_created?: string | null
          user_updated?: string | null
        }
        Update: {
          content?: string
          date_completed?: string | null
          date_created?: string | null
          date_updated?: string | null
          id?: number
          name?: string
          status?: string
          user_completed?: string | null
          user_created?: string | null
          user_updated?: string | null
        }
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { oldname: string; newname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { tbl: unknown; col: string }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: { tbl: unknown; att_name: string; geom: unknown; mode: string }
        Returns: number
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: { '': unknown }
        Returns: number
      }
      _st_concavehull: {
        Args: { param_inputgeom: unknown }
        Returns: unknown
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: boolean
          }
        | {
            Args: { geog1: unknown; geog2: unknown }
            Returns: boolean
          }
      _st_covers:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: boolean
          }
        | {
            Args: { geog1: unknown; geog2: unknown }
            Returns: boolean
          }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: { '': unknown }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: { geom: unknown }
        Returns: number
      }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip: unknown
          tolerance: number
          return_polygons: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      addauth: {
        Args: { '': string }
        Returns: boolean
      }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod: boolean
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod: boolean
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod: boolean
            }
            Returns: string
          }
      box:
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
      box2d:
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
      box2d_in: {
        Args: { '': unknown }
        Returns: unknown
      }
      box2d_out: {
        Args: { '': unknown }
        Returns: unknown
      }
      box2df_in: {
        Args: { '': unknown }
        Returns: unknown
      }
      box2df_out: {
        Args: { '': unknown }
        Returns: unknown
      }
      box3d:
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
      box3d_in: {
        Args: { '': unknown }
        Returns: unknown
      }
      box3d_out: {
        Args: { '': unknown }
        Returns: unknown
      }
      box3dtobox: {
        Args: { '': unknown }
        Returns: unknown
      }
      bytea:
        | {
            Args: { '': unknown }
            Returns: string
          }
        | {
            Args: { '': unknown }
            Returns: string
          }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dmetaphone: {
        Args: { '': string }
        Returns: string
      }
      dmetaphone_alt: {
        Args: { '': string }
        Returns: string
      }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: { table_name: string; column_name: string }
            Returns: string
          }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: { schema_name: string; table_name: string }
            Returns: string
          }
        | {
            Args: { table_name: string }
            Returns: string
          }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geography:
        | {
            Args: { '': string }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
      geography_analyze: {
        Args: { '': unknown }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: { '': unknown }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: { '': unknown }
        Returns: unknown
      }
      geography_out: {
        Args: { '': unknown }
        Returns: unknown
      }
      geography_send: {
        Args: { '': unknown }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: { '': unknown }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: { '': unknown[] }
        Returns: number
      }
      geography_typmod_out: {
        Args: { '': number }
        Returns: unknown
      }
      geometry:
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': string }
            Returns: unknown
          }
        | {
            Args: { '': string }
            Returns: unknown
          }
        | {
            Args: { '': unknown }
            Returns: unknown
          }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_analyze: {
        Args: { '': unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: { '': unknown }
        Returns: undefined
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_hash: {
        Args: { '': unknown }
        Returns: number
      }
      geometry_in: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_out: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_recv: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_send: {
        Args: { '': unknown }
        Returns: string
      }
      geometry_sortsupport: {
        Args: { '': unknown }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: { '': unknown }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: { '': unknown[] }
        Returns: number
      }
      geometry_typmod_out: {
        Args: { '': number }
        Returns: unknown
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometrytype:
        | {
            Args: { '': unknown }
            Returns: string
          }
        | {
            Args: { '': unknown }
            Returns: string
          }
      geomfromewkb: {
        Args: { '': string }
        Returns: unknown
      }
      geomfromewkt: {
        Args: { '': string }
        Returns: unknown
      }
      get_proj4_from_srid: {
        Args: { '': number }
        Returns: string
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: { '': unknown }
        Returns: unknown
      }
      gidx_out: {
        Args: { '': unknown }
        Returns: unknown
      }
      json: {
        Args: { '': unknown }
        Returns: Json
      }
      jsonb: {
        Args: { '': unknown }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: { '': unknown }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: { '': unknown }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: { '': unknown }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: { '': unknown }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: { '': unknown }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: { '': unknown }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: { '': unknown }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: { '': unknown }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: { '': unknown }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: { '': unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: { '': unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: { '': unknown }
        Returns: string
      }
      point: {
        Args: { '': unknown }
        Returns: unknown
      }
      polygon: {
        Args: { '': unknown }
        Returns: unknown
      }
      populate_geometry_columns:
        | {
            Args: { use_typmod: boolean }
            Returns: string
          }
        | {
            Args: { tbl_oid: unknown; use_typmod: boolean }
            Returns: number
          }
      postgis_addbbox: {
        Args: { '': unknown }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: string
      }
      postgis_dropbbox: {
        Args: { '': unknown }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: { '': unknown }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: { '': unknown }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: { '': unknown }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: { '': unknown }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: { '': unknown }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: { '': number }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: { '': number }
        Returns: number
      }
      postgis_typmod_type: {
        Args: { '': number }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      soundex: {
        Args: { '': string }
        Returns: string
      }
      spheroid_in: {
        Args: { '': unknown }
        Returns: unknown
      }
      spheroid_out: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlength: {
        Args: { '': unknown }
        Returns: number
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dperimeter: {
        Args: { '': unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4: unknown }
            Returns: number
          }
        | {
            Args: { line1: unknown; line2: unknown }
            Returns: number
          }
      st_area:
        | {
            Args: { '': unknown }
            Returns: number
          }
        | {
            Args: { geog: unknown; use_spheroid: boolean }
            Returns: number
          }
        | {
            Args: { '': string }
            Returns: number
          }
      st_area2d: {
        Args: { '': unknown }
        Returns: number
      }
      st_asbinary:
        | {
            Args: { '': unknown }
            Returns: string
          }
        | {
            Args: { '': unknown }
            Returns: string
          }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision: number }
        Returns: string
      }
      st_asewkb: {
        Args: { '': unknown }
        Returns: string
      }
      st_asewkt:
        | {
            Args: { '': unknown }
            Returns: string
          }
        | {
            Args: { '': unknown }
            Returns: string
          }
        | {
            Args: { '': string }
            Returns: string
          }
      st_asgeojson:
        | {
            Args: { geom: unknown; maxdecimaldigits: number; options: number }
            Returns: string
          }
        | {
            Args: {
              r: Record<string, unknown>[]
              geom_column: string
              maxdecimaldigits: number
              pretty_bool: boolean
            }
            Returns: string
          }
        | {
            Args: { geog: unknown; maxdecimaldigits: number; options: number }
            Returns: string
          }
        | {
            Args: { '': string }
            Returns: string
          }
      st_asgml:
        | {
            Args: { geom: unknown; maxdecimaldigits: number; options: number }
            Returns: string
          }
        | {
            Args: {
              version: number
              geom: unknown
              maxdecimaldigits: number
              options: number
              nprefix: string
              id: string
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geog: unknown
              maxdecimaldigits: number
              options: number
              nprefix: string
              id: string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits: number
              options: number
              nprefix: string
              id: string
            }
            Returns: string
          }
        | {
            Args: { '': string }
            Returns: string
          }
      st_ashexewkb: {
        Args: { '': unknown }
        Returns: string
      }
      st_askml:
        | {
            Args: { geom: unknown; maxdecimaldigits: number; nprefix: string }
            Returns: string
          }
        | {
            Args: { geog: unknown; maxdecimaldigits: number; nprefix: string }
            Returns: string
          }
        | {
            Args: { '': string }
            Returns: string
          }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl: string }
        Returns: string
      }
      st_asmarc21: {
        Args: { geom: unknown; format: string }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent: number
          buffer: number
          clip_geom: boolean
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geom: unknown; rel: number; maxdecimaldigits: number }
            Returns: string
          }
        | {
            Args: { geog: unknown; rel: number; maxdecimaldigits: number }
            Returns: string
          }
        | {
            Args: { '': string }
            Returns: string
          }
      st_astext:
        | {
            Args: { '': unknown }
            Returns: string
          }
        | {
            Args: { '': unknown }
            Returns: string
          }
        | {
            Args: { '': string }
            Returns: string
          }
      st_astwkb:
        | {
            Args: {
              geom: unknown
              prec: number
              prec_z: number
              prec_m: number
              with_sizes: boolean
              with_boxes: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec: number
              prec_z: number
              prec_m: number
              with_sizes: boolean
              with_boxes: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits: number; options: number }
        Returns: string
      }
      st_azimuth:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: number
          }
        | {
            Args: { geog1: unknown; geog2: unknown }
            Returns: number
          }
      st_boundary: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: { geom: unknown; fits: boolean }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; radius: number; options: string }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; radius: number; quadsegs: number }
            Returns: unknown
          }
      st_buildarea: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_centroid:
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { '': string }
            Returns: unknown
          }
      st_cleangeometry: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: { geom: unknown; box: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: { '': unknown[] }
        Returns: unknown[]
      }
      st_collect:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: unknown
          }
        | {
            Args: { '': unknown[] }
            Returns: unknown
          }
      st_collectionextract: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_convexhull: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_coorddim: {
        Args: { geometry: unknown }
        Returns: number
      }
      st_coveredby:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: boolean
          }
        | {
            Args: { geog1: unknown; geog2: unknown }
            Returns: boolean
          }
      st_covers:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: boolean
          }
        | {
            Args: { geog1: unknown; geog2: unknown }
            Returns: boolean
          }
      st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_curvetoline: {
        Args: { geom: unknown; tol: number; toltype: number; flags: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { g1: unknown; tolerance: number; flags: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_dimension: {
        Args: { '': unknown }
        Returns: number
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: number
          }
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid: boolean }
            Returns: number
          }
      st_distancesphere:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: number
          }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dump: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_dumppoints: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_dumprings: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_dumpsegments: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_envelope: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_expand:
        | {
            Args: { box: unknown; dx: number; dy: number }
            Returns: unknown
          }
        | {
            Args: { box: unknown; dx: number; dy: number; dz: number }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              dx: number
              dy: number
              dz: number
              dm: number
            }
            Returns: unknown
          }
      st_exteriorring: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_force2d: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_force3d: {
        Args: { geom: unknown; zvalue: number }
        Returns: unknown
      }
      st_force3dm: {
        Args: { geom: unknown; mvalue: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; zvalue: number; mvalue: number }
        Returns: unknown
      }
      st_forcecollection: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_forcecurve: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_forcerhr: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_forcesfs: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_generatepoints:
        | {
            Args: { area: unknown; npoints: number }
            Returns: unknown
          }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_geohash:
        | {
            Args: { geom: unknown; maxchars: number }
            Returns: string
          }
        | {
            Args: { geog: unknown; maxchars: number }
            Returns: string
          }
      st_geomcollfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance: number
          max_iter: number
          fail_if_not_converged: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_geometrytype: {
        Args: { '': unknown }
        Returns: string
      }
      st_geomfromewkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: { '': string }
        Returns: unknown
      }
      st_geomfromgeojson:
        | {
            Args: { '': string }
            Returns: unknown
          }
        | {
            Args: { '': Json }
            Returns: unknown
          }
        | {
            Args: { '': Json }
            Returns: unknown
          }
      st_geomfromgml: {
        Args: { '': string }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: { '': string }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: { marc21xml: string }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_gmltosql: {
        Args: { '': string }
        Returns: unknown
      }
      st_hasarc: {
        Args: { geometry: unknown }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { size: number; cell_i: number; cell_j: number; origin: unknown }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_intersects:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: boolean
          }
        | {
            Args: { geog1: unknown; geog2: unknown }
            Returns: boolean
          }
      st_isclosed: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_iscollection: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_isempty: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_isring: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_issimple: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_isvalid: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: { geom: unknown; flags: number }
        Returns: unknown
      }
      st_isvalidreason: {
        Args: { '': unknown }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: { '': unknown }
        Returns: boolean
      }
      st_length:
        | {
            Args: { '': unknown }
            Returns: number
          }
        | {
            Args: { geog: unknown; use_spheroid: boolean }
            Returns: number
          }
        | {
            Args: { '': string }
            Returns: number
          }
      st_length2d: {
        Args: { '': unknown }
        Returns: number
      }
      st_letters: {
        Args: { letters: string; font: Json }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { txtin: string; nprecision: number }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_linefromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linemerge: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_linetocurve: {
        Args: { geometry: unknown }
        Returns: unknown
      }
      st_locatealong: {
        Args: { geometry: unknown; measure: number; leftrightoffset: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { geometry: unknown; fromelevation: number; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_m: {
        Args: { '': unknown }
        Returns: number
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline:
        | {
            Args: { '': unknown[] }
            Returns: unknown
          }
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: unknown
          }
      st_makepolygon: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_makevalid:
        | {
            Args: { '': unknown }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; params: string }
            Returns: unknown
          }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: { '': unknown }
        Returns: Record<string, unknown>[]
      }
      st_memsize: {
        Args: { '': unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter: number }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: { '': unknown }
        Returns: Record<string, unknown>[]
      }
      st_minimumclearance: {
        Args: { '': unknown }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_multi: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_ndims: {
        Args: { '': unknown }
        Returns: number
      }
      st_node: {
        Args: { g: unknown }
        Returns: unknown
      }
      st_normalize: {
        Args: { geom: unknown }
        Returns: unknown
      }
      st_npoints: {
        Args: { '': unknown }
        Returns: number
      }
      st_nrings: {
        Args: { '': unknown }
        Returns: number
      }
      st_numgeometries: {
        Args: { '': unknown }
        Returns: number
      }
      st_numinteriorring: {
        Args: { '': unknown }
        Returns: number
      }
      st_numinteriorrings: {
        Args: { '': unknown }
        Returns: number
      }
      st_numpatches: {
        Args: { '': unknown }
        Returns: number
      }
      st_numpoints: {
        Args: { '': unknown }
        Returns: number
      }
      st_offsetcurve: {
        Args: { line: unknown; distance: number; params: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter:
        | {
            Args: { '': unknown }
            Returns: number
          }
        | {
            Args: { geog: unknown; use_spheroid: boolean }
            Returns: number
          }
      st_perimeter2d: {
        Args: { '': unknown }
        Returns: number
      }
      st_pointfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_points: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: { '': string }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: { '': string }
        Returns: unknown
      }
      st_polygonize: {
        Args: { '': unknown[] }
        Returns: unknown
      }
      st_project: {
        Args: { geog: unknown; distance: number; azimuth: number }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y: number
          prec_z: number
          prec_m: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance: number }
        Returns: unknown
      }
      st_reverse: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | {
            Args: { geom: unknown; srid: number }
            Returns: unknown
          }
        | {
            Args: { geog: unknown; srid: number }
            Returns: unknown
          }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; vertex_fraction: number; is_outer: boolean }
        Returns: unknown
      }
      st_split: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_square: {
        Args: { size: number; cell_i: number; cell_j: number; origin: unknown }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | {
            Args: { geom: unknown }
            Returns: number
          }
        | {
            Args: { geog: unknown }
            Returns: number
          }
      st_startpoint: {
        Args: { '': unknown }
        Returns: unknown
      }
      st_subdivide: {
        Args: { geom: unknown; maxvertices: number; gridsize: number }
        Returns: unknown
      }
      st_summary:
        | {
            Args: { '': unknown }
            Returns: string
          }
        | {
            Args: { '': unknown }
            Returns: string
          }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds: unknown
          margin: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_transform:
        | {
            Args: { geom: unknown; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; from_proj: string; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; from_proj: string; to_srid: number }
            Returns: unknown
          }
      st_triangulatepolygon: {
        Args: { g1: unknown }
        Returns: unknown
      }
      st_union:
        | {
            Args: { geom1: unknown; geom2: unknown }
            Returns: unknown
          }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
        | {
            Args: { '': unknown[] }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { g1: unknown; tolerance: number; extend_to: unknown }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { g1: unknown; tolerance: number; extend_to: unknown }
        Returns: unknown
      }
      st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: { wkb: string }
        Returns: unknown
      }
      st_wkttosql: {
        Args: { '': string }
        Returns: unknown
      }
      st_wrapx: {
        Args: { geom: unknown; wrap: number; move: number }
        Returns: unknown
      }
      st_x: {
        Args: { '': unknown }
        Returns: number
      }
      st_xmax: {
        Args: { '': unknown }
        Returns: number
      }
      st_xmin: {
        Args: { '': unknown }
        Returns: number
      }
      st_y: {
        Args: { '': unknown }
        Returns: number
      }
      st_ymax: {
        Args: { '': unknown }
        Returns: number
      }
      st_ymin: {
        Args: { '': unknown }
        Returns: number
      }
      st_z: {
        Args: { '': unknown }
        Returns: number
      }
      st_zmax: {
        Args: { '': unknown }
        Returns: number
      }
      st_zmflag: {
        Args: { '': unknown }
        Returns: number
      }
      st_zmin: {
        Args: { '': unknown }
        Returns: number
      }
      text: {
        Args: { '': unknown }
        Returns: string
      }
      text_soundex: {
        Args: { '': string }
        Returns: string
      }
      unlockrows: {
        Args: { '': string }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
