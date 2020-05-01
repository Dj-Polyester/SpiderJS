#include "../include/signals.h"

size_t file_count(FILE* fptr) 
{
	char ch;
	size_t count=0;
	
	if(fptr==NULL) {
		printf("File can't be opened\n");
		exit(1);
	}
	while((ch=fgetc(fptr))!=EOF)
		count++;
	
	return count;
}

void read_json()
{
    
	size_t fileCount, n_keys, n_links;
    JSON_object* parsed_json, *key, *link;
    FILE* fp;
	char* buffer, *key_text, *link_text;

    fp = fopen("var.json","r");
    fileCount = file_count(fp);
	buffer = malloc((fileCount+1)*sizeof(char));
    fseek(fp, 0, SEEK_SET);
	fread(buffer,fileCount,sizeof(char),fp);
    fclose(fp);
   
	parsed_json = json_tokener_parse(buffer);
    json_object_object_get_ex(parsed_json, "KEYS", &json.keys);
    json_object_object_get_ex(parsed_json, "LINKS", &json.links);
    n_keys = json_object_array_length(json.keys);
    n_links = json_object_array_length(json.links);
    for (size_t i = 0; i < n_keys; i++)
    {
        key = json_object_array_get_idx(json.keys,i);
        key_text = json_object_get_string(key);
        
        gtk_list_store_append (app.key_list_store, app.key_list_iter);
        gtk_combo_box_text_append (app.word_combobox, NULL, key_text);
    }
    for (size_t i = 0; i < n_links; i++)
    {
        link = json_object_array_get_idx(json.links,i);
        link_text = json_object_get_string(link);
        
        gtk_list_store_append (app.url_list_store, app.url_list_iter);
        gtk_combo_box_text_append (app.url_combobox, NULL, link_text);
    }
    
    free(buffer);
}

void	on_destroy() 
{
		gtk_main_quit();
}   

void connect_signals()
{
    gtk_builder_connect_signals(app.builder, NULL);
    g_signal_connect(app.button, "clicked", on_search_clicked, &app);
}
void
on_search_clicked (GtkComboBox *widget,
               Application* user_data)
{
    const gchar* url=gtk_entry_get_text (user_data->url_entry);
    const gchar* word=gtk_entry_get_text (user_data->word_entry);
    init_spider(url,word);
}

void init_spider(const gchar* url, const gchar* word)
{
    gchar* command[20];
    sprintf(command,"node src/scrape.js %s %s",url,word);
    //g_print("%s",command);
    FILE *fp;

    /* Open the command for reading. */
    fp = popen(command, "w");
    if (fp == NULL) {
      printf("Failed to run spider\n" );
      exit(1);
    }

    /* close */
    pclose(fp);
}