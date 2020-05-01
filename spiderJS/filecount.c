    #include<stdio.h>
    #include<stdlib.h>
   // #include<conio.h>
    size_t file_count(FILE* fptr) {
    	char ch;
    	size_t count=0;
    	
    	if(fptr==NULL) {
    		printf("File can't be created\a");
    		exit(0);
    	}
    	while((ch=fgetc(fptr))!=EOF)
    		count++;
    	
    	return count;
    }
void read_json()
{
    
	FILE* fp;
	char* buffer;
    fp = fopen("var.json","r");
    size_t fileCount = file_count(fp);
	buffer = malloc((fileCount+1)*sizeof(char));
    fseek(fp, 0, SEEK_SET);
	fread(buffer,fileCount,sizeof(char),fp);
    fclose(fp);
   
	

    free(buffer);
    
}
int main(int argc, char const *argv[])
{
	read_json();
	// FILE* fptr = fopen(argv[1],"r");
	// printf("%lu",file_count(fptr));
	// fclose(fptr);
	return 0;
}
