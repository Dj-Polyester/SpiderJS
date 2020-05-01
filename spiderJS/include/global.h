#include <gtk/gtk.h>
#include <gtk/gtkx.h>
#include <gdk/gdk.h>
#include <json-c/json.h>
#include <vte-2.91/vte/vte.h>

typedef struct json_object JSON_object;


typedef struct application
{
    GtkBuilder* builder;
    GtkCssProvider* cssProvider;
    GtkWidget* window;	
    GtkWidget* terminal;	
    GtkWidget* frame;	
    GtkWidget* url_entry;	
    GtkWidget* url_combobox;	
    GtkWidget* word_entry;
    GtkWidget* word_combobox;
    GtkWidget* button;
    GtkListStore* url_list_store;
    GtkListStore* key_list_store;
    GtkWidget* url_list_iter;
    GtkWidget* key_list_iter;
} Application;

typedef struct Json
{
    FILE fp;
    JSON_object* links;
    JSON_object* keys;
}JSON;

Application app;
JSON json;

