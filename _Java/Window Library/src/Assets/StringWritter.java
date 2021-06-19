package Assets;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;

public class StringWritter {
	
	public static void WriteStrToFile (String path, String content) {
		
		try {
			
            Files.writeString(Paths.get(path), content);

        } catch (IOException e) {
        	
            e.printStackTrace();
            
        }
		
	}
	
}
